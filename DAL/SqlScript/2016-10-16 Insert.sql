
--Delete
Delete from UserContentTbl
Go
Delete from [ContentTbl]
Go
Delete from [UserDetailsTbl]
Go
Delete from [UsersTbl]
Go
Delete from [UserTypesTbl]
Go
Delete from [RolesTbl]
Go

--Roles
INSERT [dbo].[RolesTbl] ([RoleId], RoleDisplayName, [RoleName]) VALUES (100, N'Agent', N'Agent')
GO
INSERT [dbo].[RolesTbl] ([RoleId], RoleDisplayName, [RoleName]) VALUES (200, N'Admin', N'Admin')
GO
INSERT [dbo].[RolesTbl] ([RoleId], RoleDisplayName, [RoleName]) VALUES (300, N'Super Admin', N'SuperAdmin')
GO

--User Types
INSERT [dbo].[UserTypesTbl] ([UserTypeId], UserTypeDisplayName, [UserTypeName]) VALUES (1, N'Normal Agent', N'NormalAgent')
GO

----UsersTbl
SET IDENTITY_INSERT [dbo].[UsersTbl] ON 
GO
INSERT [dbo].[UsersTbl] ([UserId], [Username], [Password]) VALUES (1, N'superadmin', N'superadmin')
GO
--INSERT [dbo].[UsersTbl] ([UserId], [Username], [Password]) VALUES (2, N'admin', N'admin')
--GO
--INSERT [dbo].[UsersTbl] ([UserId], [Username], [Password]) VALUES (3, N'psingh', N'psingh')
--GO
SET IDENTITY_INSERT [dbo].[UsersTbl] OFF
GO

----UserDetailsTbl
INSERT [dbo].[UserDetailsTbl] ([UserId], [RoleId], [UserTypeId], [UserFirstName], [UserLastName], [UserEmail], [CreatedBy], [ModifiedBy]) 
VALUES (1, 300, 1, N'Super', N'Admin', N'super@admin.com', 1, 1)
GO
--INSERT [dbo].[UserDetailsTbl] ([UserId], [RoleId], [UserTypeId], [UserFirstName], [UserLastName], [UserEmail], [CreatedBy], [ModifiedBy]) 
--VALUES (2, 200, 1, N'Admin', N'Hayabusa', N'shaminder@shaminder.com', 1, 1)
--GO
--INSERT [dbo].[UserDetailsTbl] ([UserId], [RoleId], [UserTypeId], [UserFirstName], [UserLastName], [UserEmail], [CreatedBy], [ModifiedBy]) 
--VALUES (3, 100, 1, N'Agent', N'User', N'agent@user.com', 2, 2)
GO

--ContentTbl
SET IDENTITY_INSERT [dbo].[ContentTbl] ON 
GO
INSERT INTO [ContentTbl]([ContentId],[ContentURL],[ContentName],[ContentType],[IsDeleted],[CreatedDate],[CreatedBy],[ModifiedDate],[ModifiedBy])
     VALUES(1,'https://www.youtube.com/watch?v=TUwCmcR83EE','Stage 4 - Love','Video',0,getdate(),1,getdate(),1)
GO

INSERT INTO [ContentTbl]([ContentId],[ContentURL],[ContentName],[ContentType],[IsDeleted],[CreatedDate],[CreatedBy],[ModifiedDate],[ModifiedBy])
     VALUES(2,'https://www.youtube.com/watch?v=dp48nCGgTuE','Stage 3 - Upset','Video',0,getdate(),1,getdate(),1)
GO

INSERT INTO [ContentTbl]([ContentId],[ContentURL],[ContentName],[ContentType],[IsDeleted],[CreatedDate],[CreatedBy],[ModifiedDate],[ModifiedBy])
     VALUES(3,'https://www.youtube.com/watch?v=F1IkFo9TrJo','Stage 2 - Meeting','Video',0,getdate(),1,getdate(),1)
GO
SET IDENTITY_INSERT [dbo].[ContentTbl] OFF
GO