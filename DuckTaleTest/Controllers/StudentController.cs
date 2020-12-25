using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DuckTale.dbmodel.Model;
using DuckTaleTest.EF.Repositories.ModelService;
using DuckTaleTest.EF.UnitsOfWork;
using DuckTaleTest.Helpers;
using DuckTaleTest.ViewModels;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DuckTaleTest.Controllers
{
    public class StudentController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;

        public StudentController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            var StudentInfo = _unitOfWork.studentinfoService.GetAll();
            return View(StudentInfo);
        }

        public IActionResult AddStudentInfo()
        {
            var _StudentInfo = new StudentInfoViewModel();
            _StudentInfo.Subjects = new ClassHelper(_unitOfWork).GetSubjectLink(null);
            _StudentInfo.StudentFk= Guid.NewGuid();
            TempData["id"] = _StudentInfo.StudentFk;
            return View(_StudentInfo);
        }


        [HttpPost]
        public async Task<IActionResult> AddStudentInfo(StudentInfoViewModel _model, List<StudentInfoLinkViewModel> StudentSubject)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    List<StudentInfoLink> _ItemcategoryLink = AutoMapper.Mapper.Map<List<StudentInfoLink>>(StudentSubject);
                    var _Item = AutoMapper.Mapper.Map<Studentinfo>(_model);
                    _Item.Id = Guid.Parse(TempData["id"].ToString());
                    _Item.FirstName = _model.FirstName;
                    _Item.LastName = _model.LastName;
                    _Item.Class = _model.Class;
                    _Item.CreatedOn = DateTime.Now;
                    _Item.ModifyOn = DateTime.Now;
                    _Item.SubjectNamelinks = _ItemcategoryLink;
                    _unitOfWork.studentinfoService.Add(_Item);
                    await _unitOfWork.SaveChanges();
                    return RedirectToAction(nameof(Index));
                }
                catch (Exception ex)
                {

                }
            }
            return View(_model);
        }


        public IActionResult Edit(Guid Id)
        {
            if (Id != Guid.Empty)
            {
                var _item = _unitOfWork.studentinfoService.Get<Guid>(Id);
                var model = new StudentInfoViewModel();

                if (_item != null)
                {
                    model = AutoMapper.Mapper.Map<StudentInfoViewModel>(_item);
                    model.Subjects = new ClassHelper(_unitOfWork).GetSubjectLink(Id);
                    model.Studentinfolink = new ClassHelper(_unitOfWork).GetinfoLink(Id);
                    return View(model);
                }
                return NotFound();
            }
            return BadRequest();
        }


        [HttpPost]
        public async Task<IActionResult> Edit(StudentInfoViewModel _model, List<StudentInfoLinkViewModel> StudentSubject)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    List<StudentInfoLink> _ItemcategoryLink = AutoMapper.Mapper.Map<List<StudentInfoLink>>(StudentSubject);
                    var _Item = AutoMapper.Mapper.Map<Studentinfo>(_model);
                    _Item.Id = Guid.Parse(TempData["id"].ToString());
                    _Item.FirstName = _model.FirstName;
                    _Item.LastName = _model.LastName;
                    _Item.Class = _model.Class;
                    _Item.CreatedOn = DateTime.Now;
                    _Item.ModifyOn = DateTime.Now;
                    _Item.SubjectNamelinks = _ItemcategoryLink;
                    _unitOfWork.studentinfoService.Update(_Item);
                    await _unitOfWork.SaveChanges();
                    return RedirectToAction(nameof(Index));
                }
                catch (Exception ex)
                {

                }
            }
            return View(_model);
        }


    }
}
