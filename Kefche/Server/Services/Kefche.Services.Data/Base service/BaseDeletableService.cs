namespace Kefche.Services.Data
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Threading.Tasks;
    using Kefche.Data;
    using Kefche.Data.Common.Models;
    using Kefche.Data.Common.Models.Common;
    using Kefche.Data.Common.Repositories;
    using Kefche.Services.Mapping;
    using Microsoft.EntityFrameworkCore;

    public abstract class BaseDeletableService<T, TKey> : IBaseDeletableService<T, TKey>
        where T : BaseDeletableModel<TKey>
    {
        private readonly ApplicationDbContext context;
        private readonly IDeletableEntityRepository<T> repository;

        protected BaseDeletableService(ApplicationDbContext context, IDeletableEntityRepository<T> repository)
        {
            this.context = context;
            this.repository = repository;
        }

        public virtual async Task<IEnumerable<TModel>> All<TModel>()
        {
            return await this.repository.All().To<TModel>().ToListAsync();
        }

        public IEnumerable<TModel> All<TModel>(Expression<Func<T, bool>> filter) =>
            this.repository
                .All()
                .Where(filter)
                .To<TModel>()
                .ToList();

        public async Task<IEnumerable<TModel>> AllWithDeleted<TModel>()
        {
            return await this.repository.AllWithDeleted().To<TModel>().ToListAsync();
        }

        public async Task<IEnumerable<TModel>> AllAsNoTrackingWithDeleted<TModel>()
        {
            return await this.repository.AllAsNoTrackingWithDeleted().To<TModel>().ToListAsync();
        }

        public IEnumerable<TModel> All<TModel>(Func<TModel, object> orderBy, bool descending = false)
        {
            IQueryable<TModel> models = this.repository.All().To<TModel>();
            if (descending)
            {
                return models.OrderByDescending(orderBy).ToList();
            }

            return models.OrderBy(orderBy).ToList();
        }

        public virtual async Task<TKey> Create<TInputModel>(TInputModel model)
        {
            T entity = model.To<T>();
            await this.repository.AddAsync(entity);
            await this.context.SaveChangesAsync();

            return entity.Id;
        }

        public async Task<TKey> CreateOrUpdate<TInputModel>(TInputModel model, Expression<Func<T, bool>> filterExpression)
        {
            T entity = this.repository.All().FirstOrDefault(filterExpression);
            if (entity != default(T))
            {
                await this.Update(entity.Id, model);
                return entity.Id;
            }
            else
            {
                return await this.Create(model);
            }
        }

        public virtual async Task HardDeleteById(TKey id)
        {
            T entity = this.repository.All().FirstOrDefault(x => Equals(x.Id, id));
            this.repository.HardDelete(entity);
            await this.context.SaveChangesAsync();
        }

        public virtual async Task SoftDeleteById(TKey id)
        {
            T entity = this.repository.All().FirstOrDefault(x => Equals(x.Id, id));
            this.repository.Delete(entity);
            await this.context.SaveChangesAsync();
        }

        public virtual async Task HardDeleteEntity(T entity)
        {
            this.repository.HardDelete(entity);
            await this.context.SaveChangesAsync();
        }

        public virtual async Task SoftDeleteEntity(T entity)
        {
            this.repository.Delete(entity);
            await this.context.SaveChangesAsync();
        }

        public virtual TModel GetById<TModel>(TKey id) =>
            this.repository.All().Where(t => t.Id.Equals(id))
            .To<TModel>()
            .FirstOrDefault();

        public virtual async Task Update<TInputModel>(TKey id, TInputModel model)
        {
            T entity = this.repository.All().FirstOrDefault(x => Equals(x.Id, id));
            model.To<T>(entity);
            this.repository.Update(entity);
            await this.context.SaveChangesAsync();
        }

        public async Task Update<TEntity>(
            ICollection<TEntity> currentEntities,
            IEnumerable<IIdentifiableEntity<int?>> inputModels)
            where TEntity : BaseDeletableModel<int>
        {
            this.Update(currentEntities, inputModels, out IEnumerable<TEntity> entitiesToAdd);

            await this.context.Set<TEntity>().AddRangeAsync(entitiesToAdd);
        }

        public void Update<TEntity>(
            ICollection<TEntity> currentEntities,
            IEnumerable<IIdentifiableEntity<int?>> inputModels,
            out IEnumerable<TEntity> entitiesToAdd)
            where TEntity : BaseDeletableModel<int>
        {
            if (inputModels == null)
            {
                inputModels = new List<IIdentifiableEntity<int?>>();
            }

            if (!currentEntities.Any() && !inputModels.Any())
            {
                entitiesToAdd = new List<TEntity>();
                return;
            }

            DbSet<TEntity> entities = this.context.Set<TEntity>();

            // Remove entites which are maraked as deleted
            IEnumerable<TEntity> entitiesToDelete = this.GetEntitiesToDelete(currentEntities, inputModels);
            entities.RemoveRange(entitiesToDelete);

            // Update the entites which are marked for update
            this.UpdateEntities(currentEntities, inputModels, entities);

            // Get the entites which are added
            entitiesToAdd = this.GetEntitiesToAdd<TEntity>(inputModels);
        }

        public IEnumerable<TEntity> GetEntitiesToAdd<TEntity>(
            IEnumerable<IIdentifiableEntity<int?>> inputModels)
            where TEntity : BaseDeletableModel<int> => inputModels
                        .Where(i => i.Id == null || !i.Id.HasValue)
                        .Select(model => model.To<TEntity>());

        public void UpdateEntities<TEntity>(
            ICollection<TEntity> currentEntities, IEnumerable<IIdentifiableEntity<int?>> inputModels,
            DbSet<TEntity> entites)
            where TEntity : BaseDeletableModel<int>
        {
            foreach (IIdentifiableEntity<int?> inputModel in inputModels.Where(m => m.Id != null && m.Id.HasValue))
            {
                TEntity targertEntity = currentEntities.FirstOrDefault(c => c.Id == inputModel.Id.Value);
                if (targertEntity != null)
                {
                    inputModel.To<TEntity>(targertEntity);
                    entites.Update(targertEntity);
                }
            }
        }

        public IEnumerable<TEntity> GetEntitiesToDelete<TEntity>(
            ICollection<TEntity> currentEntities,
            IEnumerable<IIdentifiableEntity<int?>> inputModels)
            where TEntity : BaseDeletableModel<int>
        {
            var entityIds = new HashSet<int>(
                inputModels
                .Where(i => i.Id != null && i.Id.HasValue)
                .Select(i => i.Id.Value));

            IEnumerable<TEntity> entitiesToDelete = currentEntities
                .Where(c => !entityIds.Contains(c.Id));

            return entitiesToDelete;
        }

        public virtual bool Exists(Expression<Func<T, bool>> expression) => this.repository.All().Any(expression);
    }
}
