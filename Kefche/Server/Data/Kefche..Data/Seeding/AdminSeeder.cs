namespace Kefche.Data.Seeding
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using Kefche.Common;
    using Kefche.Data.Models;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.Extensions.DependencyInjection;

    public class AdminSeeder : ISeeder
    {
        public async Task SeedAsync(ApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            UserManager<ApplicationUser> userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            ApplicationUser userFromDb = await userManager.FindByEmailAsync("user@admin.com");

            if (userFromDb != null)
            {
                return;
            }

            var user = new ApplicationUser
            {
                Email = "user@admin.com",
                UserName = "user@admin.com",
            };
            var result = await userManager.CreateAsync(user, "sysadmin");
            if (!result.Succeeded)
            {
                throw new Exception(string.Join(Environment.NewLine, result.Errors.Select(e => e.Description)));
            }

            await userManager.AddToRoleAsync(user, GlobalConstants.AdministratorRoleName);
            await dbContext.SaveChangesAsync();
        }
    }
}
