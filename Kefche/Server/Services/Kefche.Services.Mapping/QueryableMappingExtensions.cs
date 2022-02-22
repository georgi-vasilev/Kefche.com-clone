namespace Kefche.Services.Mapping
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Threading.Tasks;
    using AutoMapper;
    using AutoMapper.QueryableExtensions;
    using static AutoMapperConfig;

    public static class QueryableMappingExtensions
    {
        public static IQueryable<TDestination> To<TDestination>(
            this IQueryable source,
            params Expression<Func<TDestination, object>>[] membersToExpand)
        {
            if (source == null)
            {
                throw new ArgumentNullException(nameof(source));
            }

            return source.ProjectTo(AutoMapperConfig.MapperInstance.ConfigurationProvider, null, membersToExpand);
        }

        public static IQueryable<TDestination> To<TDestination>(
            this IQueryable source,
            object parameters)
        {
            if (source == null)
            {
                throw new ArgumentNullException(nameof(source));
            }

            return source.ProjectTo<TDestination>(AutoMapperConfig.MapperInstance.ConfigurationProvider, parameters);
        }

        public static TDestination To<TDestination>(this object source)
         {
             if (source == null)
             {
                 throw new ArgumentNullException(nameof(source));
             }

             return MapperInstance.Map<TDestination>(source);
         }

        public static TDestination To<TDestination>(this object source, object destination)
        {
            return (TDestination)MapperInstance.Map(source, destination, source.GetType(), destination.GetType());
        }

        public static TDestination To<Source, TDestination>(this Source source, TDestination destination, Action<IMappingOperationOptions<Source, TDestination>> options) =>
          MapperInstance.Map(source, destination, options);

        public static IEnumerable<TDestination> MapCollection<TDestination>(this IEnumerable enumerable)
           => MapperInstance.Map<IEnumerable<TDestination>>(enumerable);

        public static async Task<IEnumerable<TDestination>> MapCollection<TDestination>(this Task task)
        {
            var taskWithResult = task as dynamic;

            if (!task.HasEnumerableResult())
            {
                dynamic destination = MapperInstance.Map<TDestination>(await taskWithResult);
                return new List<TDestination> { destination };
            }

            return MapperInstance.Map<IEnumerable<TDestination>>(await taskWithResult);
        }

        private static bool HasEnumerableResult(this Task task)
        {
            Type type = task.GetType();
            if (!type.IsGenericType)
            {
                throw new InvalidOperationException("Cannot map a void Task.");
            }

            Type[] genericArguments = type.GetGenericArguments();

            return typeof(IEnumerable).IsAssignableFrom(genericArguments.First());
        }
    }
}
