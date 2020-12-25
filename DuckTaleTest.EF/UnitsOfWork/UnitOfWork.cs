using DuckTale.dbmodel.Model;
using DuckTaleTest.dbmodel;
using DuckTaleTest.EF.Repositories.Interfaces;
using DuckTaleTest.EF.Repositories.ModelService;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DuckTaleTest.EF.UnitsOfWork
{
    public class  UnitOfWork : IUnitOfWork, IDisposable
	{
        dbcontext _context;

        private StudentinfoService _studentinfoService;
        private StudentInfoLinkService _studentInfoLinkService;
        private StudentSubjectService _studentSubjectService;

        public UnitOfWork(dbcontext context)
        {
            _context = context;
        }


		public StudentinfoService studentinfoService
		{
			get
			{
				if (_studentinfoService == null)
					_studentinfoService = new StudentinfoService(_context);
				return _studentinfoService;
			}
		}

		public StudentInfoLinkService studentInfoLinkService
		{
			get
			{
				if (_studentInfoLinkService == null)
					_studentInfoLinkService = new StudentInfoLinkService(_context);
				return _studentInfoLinkService;
			}
		}

		public StudentSubjectService studentSubjectService
		{
			get
			{
				if (_studentSubjectService == null)
					_studentSubjectService = new StudentSubjectService(_context);
				return _studentSubjectService;
			}
		}

		
		public async Task<int> SaveChanges()
		{
			return await _context.SaveChangesAsync();
		}

		
		public void Dispose()
		{
			this.Dispose(true);
			GC.SuppressFinalize(this);
		}

		protected virtual void Dispose(bool disposing)
		{
			if (!disposing)
			{
				return;
			}

			if (this._context == null)
			{
				return;
			}

			this._context.Dispose();
			this._context = null;
		}

	}
}
