namespace Kefche.Services.Data
{
    using System;
    using System.Collections.Generic;
    using System.Linq.Expressions;
    using System.Threading.Tasks;
    using Kefche.Data.Common.Models;
    using Kefche.Data.Common.Models.Common;
    using Microsoft.EntityFrameworkCore;

    public interface IBaseDeletableService<T, TKey>
        where T : BaseDeletableModel<TKey>
    {
        Task<IEnumerable<TModel>> All<TModel>();

        IEnumerable<TModel> All<TModel>(Expression<Func<T, bool>> filter);

        IEnumerable<TModel> All<TModel>(Func<TModel, object> orderBy, bool descending = false);

        Task<TKey> Create<TInputModel>(TInputModel model);

        Task Update<TInputModel>(TKey id, TInputModel model);

        Task<TKey> CreateOrUpdate<TInputModel>(TInputModel model, Expression<Func<T, bool>> filterExpression);

        Task HardDeleteById(TKey id);

        Task SoftDeleteById(TKey id);

        Task HardDeleteEntity(T entity);

        Task SoftDeleteEntity(T entity);

        TModel GetById<TModel>(TKey id);

        void Update<TEntity>(
            ICollection<TEntity> currentEntities,
            IEnumerable<IIdentifiableEntity<int?>> inputModels,
            out IEnumerable<TEntity> entitiesToAdd)
            where TEntity : BaseDeletableModel<int>;

        Task Update<TEntity>(
            ICollection<TEntity> currentEntities,
            IEnumerable<IIdentifiableEntity<int?>> inputModels)
            where TEntity : BaseDeletableModel<int>;

        void UpdateEntities<TEntity>(
           ICollection<TEntity> currentEntities, IEnumerable<IIdentifiableEntity<int?>> inputModels,
           DbSet<TEntity> entities)
           where TEntity : BaseDeletableModel<int>;

        IEnumerable<TEntity> GetEntitiesToDelete<TEntity>(
            ICollection<TEntity> currentEntities,
            IEnumerable<IIdentifiableEntity<int?>> inputModels)
            where TEntity : BaseDeletableModel<int>;

        IEnumerable<TEntity> GetEntitiesToAdd<TEntity>(
            IEnumerable<IIdentifiableEntity<int?>> inputModels)
            where TEntity : BaseDeletableModel<int>;

        bool Exists(Expression<Func<T, bool>> expression);
    }
}
