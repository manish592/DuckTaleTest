using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DuckTaleTest.dbmodel;
using DuckTaleTest.EF.Repositories.Interfaces;
using DuckTaleTest.EF.UnitsOfWork;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace DuckTaleTest
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddMvc();
            services.AddMemoryCache();
            var _connectionString = Configuration.GetConnectionString("DefaultConnection");

            services.AddDbContext<dbcontext>(option => { option.UseSqlServer(_connectionString); });

            services.AddControllersWithViews();

            services.AddScoped<IUnitOfWork, UnitOfWork>();


            AutoMapper.Mapper.Initialize(cfg =>
            {

                cfg.AddProfile<Mapper.Mapper>();
            });

            services.AddSession();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
           // services.AddDbContext<ViewModels.StudentSubjectViewModel>(opt => opt.UseMemoryCache("_connectionString"));
            //services.AddTransient<IRepository<Packages>, Repository<Packages>>();
            // services.AddTransient<IUnitOfWork, UnitsOfWork.Service.UnitOfWork>();


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
           
        }
    }
}
