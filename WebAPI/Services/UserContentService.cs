using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System;

using AutoMapper;
using DAL.Entities;

using WebApi.Models;
using WebApi.Models.ContentModelExtensions;
using WebApi.AppConstants;
using WebApi.AppConstants.ValidationMessages;
using WebApi.Helpers.Exceptions;

namespace WebApi.Services
{
    public interface IUserContentService
    {
        //Task<ContentModel> GetById(int id);
        //Task<List<ContentListModel>> GetList();
        //ContentCreateGetModel GetForCreate();
        //Task<ContentEditGetModel> GetForEdit(int id);

        Task<List<UserContentTbl>> GetForCreate(int userId);
        //Task<bool> Update(ContentBaseModel updateModel, int operatingUserId);
        //Task Delete(int id, int operatingUserId);
    }

    public class UserContentService : IUserContentService
    {
        private DataContext _context;
        private IMapper _mapper;
        private IContentService _contentService;

        public UserContentService(
            DataContext context,
            IMapper mapper,
            IContentService contentService)
        {
            _context = context;
            _mapper = mapper;
            _contentService = contentService;
        }

        ///// <summary>
        ///// Get content details by id
        ///// </summary>
        ///// <param name="id"></param>
        ///// <returns></returns>
        //public async Task<ContentModel> GetById(int id)
        //{
        //    var tblRow = await _context.ContentTbl
        //        .Where(c => 
        //            c.ContentId == id 
        //            && !c.IsDeleted)
        //        .AsNoTracking()
        //        .SingleOrDefaultAsync();

        //    //if not found then show error
        //    if (tblRow == null) { throw new NotFoundException(ContentValidationMessage.CONTENT_NOT_FOUND); }

        //    return _mapper.Map<ContentModel>(tblRow);
        //}

        ///// <summary>
        ///// Gets list of all contents excluding non-active ones
        ///// </summary>
        ///// <returns>Returns list of content</returns>
        //public async Task<List<ContentListModel>> GetList()
        //{
        //    var tblRows = await _context.ContentTbl
        //        .Where(c =>
        //            !c.IsDeleted)
        //        .Include(s => s.CreatedByNavigation)
        //        .Include(s => s.ModifiedByNavigation)
        //        .AsNoTracking()
        //        .ToListAsync();

        //    return _mapper.Map<List<ContentTbl>, List<ContentListModel>>(tblRows);
        //}

        //public ContentCreateGetModel GetForCreate()
        //{
        //    ContentCreateGetModel createGetModel = new ContentCreateGetModel
        //    {
        //        ContentType = ContentType.GetAll()
        //    };

        //    return createGetModel;
        //}

        //public async Task<ContentEditGetModel> GetForEdit(int id)
        //{
        //    ContentEditGetModel editGetModel = new ContentEditGetModel
        //    {
        //        ContentType = ContentType.GetAll()
        //    };

        //    var toEditTblRow = await _context.ContentTbl
        //        .Where(c =>
        //            c.ContentId == id
        //            && !c.IsDeleted)
        //        .AsNoTracking()
        //        .SingleOrDefaultAsync();

        //    //if not found then show error
        //    if (toEditTblRow == null) { throw new NotFoundException(ContentValidationMessage.CONTENT_NOT_FOUND); }

        //    editGetModel.Content = _mapper.Map<ContentBaseModel>(toEditTblRow);

        //    return editGetModel;
        //}

        public async Task<List<UserContentTbl>> GetForCreate(int userId)
        {
            //get list of all content
            var contentTbl = await _contentService.GetAll();

            List<UserContentTbl> userContent = new List<UserContentTbl>();
            foreach (var contentRow in contentTbl)
            {
                userContent.Add(
                    new UserContentTbl()
                    {
                        UserId = userId,
                        ContentId = contentRow.ContentId
                    }
                );
            };

            return userContent;
        }

        //public async Task<bool> Update(ContentBaseModel updateModel, int operatingUserId)
        //{
        //    //No need to check for duplicate as in some cases same content can be displayed twice.
        //    //So for now lets allow duplicate content

        //    ContentTbl tblRow = await _context.ContentTbl
        //        .Where(row =>
        //            row.ContentId == updateModel.ContentId
        //            && !row.IsDeleted)
        //        .SingleOrDefaultAsync();

        //    //if no record found then show error
        //    if (tblRow == null) { throw new NotFoundException(ContentValidationMessage.CONTENT_NOT_FOUND); }

        //    //populate table objects
        //    _mapper.Map(updateModel, tblRow);

        //    tblRow.ModifiedBy = operatingUserId;
        //    tblRow.ModifiedDate = DateTime.Now;

        //    await _context.SaveChangesAsync();

        //    return true;
        //}

        //public async Task Delete(int id, int operatingUserId)
        //{
        //    var tblRow = await _context.ContentTbl.SingleOrDefaultAsync(x => x.ContentId == id);

        //    //if no user is found then show error
        //    if (tblRow == null) { throw new NotFoundException(ContentValidationMessage.CONTENT_NOT_FOUND); }

        //    tblRow.IsDeleted = true;
        //    tblRow.ModifiedBy = operatingUserId;
        //    tblRow.ModifiedDate = DateTime.Now;

        //    await _context.SaveChangesAsync();
        //}
    }
}