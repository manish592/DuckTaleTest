using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using DuckTaleTest.Models;
using DuckTaleTest.ViewModels;
using DuckTaleTest.EF.UnitsOfWork;
using DuckTale.dbmodel.Model;

namespace DuckTaleTest.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IUnitOfWork _unitOfWork;
       

        public HomeController(ILogger<HomeController> logger, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public IActionResult Index()
        {
            var SubjectList = _unitOfWork.studentSubjectService.GetAll();
            return View(SubjectList);
        }

        public IActionResult Create()
        {
            StudentSubjectViewModel model = new StudentSubjectViewModel();
            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> Create(StudentSubjectViewModel model)
        {
            if (ModelState.IsValid)
            {
                StudentSubject _Addmaster = AutoMapper.Mapper.Map<StudentSubject>(model);
                _Addmaster.SubjectName = model.SubjectName;
                _unitOfWork.studentSubjectService.Add(_Addmaster);
                await _unitOfWork.SaveChanges();
                return RedirectToAction(nameof(Index));
            }
            return View(model);
        }

       
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
