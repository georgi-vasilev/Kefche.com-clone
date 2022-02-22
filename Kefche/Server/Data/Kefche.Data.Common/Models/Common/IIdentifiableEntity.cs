namespace Kefche.Data.Common.Models.Common
{
    public interface IIdentifiableEntity<TKey>
    {
        TKey Id { get; set; }
    }
}
