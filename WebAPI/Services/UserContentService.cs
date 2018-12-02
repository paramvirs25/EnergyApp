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
        Task<List<UserContentListModel>> GetListByUserId(int userId);
        
        Task<List<UserContentTbl>> GetNewUserContent(int userId);
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

        public async Task<List<UserContentListModel>> GetListByUserId(int userId)
        {
            var tblRows = await _context.UserContentTbl
                .Include(uct => uct.Content)
                .Where(uct =>
                    !uct.Content.IsDeleted)
                .AsNoTracking()
                .ToListAsync();

            return _mapper.Map<List<UserContentTbl>, List<UserContentListModel>>(tblRows);
        }

        public async Task<List<UserContentTbl>> GetNewUserContent(int userId)
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
    }
}