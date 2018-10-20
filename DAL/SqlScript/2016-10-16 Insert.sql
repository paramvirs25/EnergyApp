--Delete
Delete from [UserDetailsTbl]
Go
Delete from [UsersTbl]
Go
Delete from [UserTypesTbl]
Go
Delete from [RolesTbl]
Go

--Roles
INSERT [dbo].[RolesTbl] ([RoleId], [RoleName]) VALUES (100, N'Agent')
GO
INSERT [dbo].[RolesTbl] ([RoleId], [RoleName]) VALUES (200, N'Admin')
GO
INSERT [dbo].[RolesTbl] ([RoleId], [RoleName]) VALUES (300, N'SuperAdmin')
GO


INSERT [dbo].[UserTypesTbl] ([UserTypeId], [UserTypeName]) VALUES (1, N'NormalAgent')
GO

--UsersTbl
SET IDENTITY_INSERT [dbo].[UsersTbl] ON 
GO
INSERT [dbo].[UsersTbl] ([UserId], [Username], [Password]) VALUES (1, N'psingh', N'psingh')
GO
INSERT [dbo].[UsersTbl] ([UserId], [Username], [Password]) VALUES (2, N'admin', N'admin')
GO
INSERT [dbo].[UsersTbl] ([UserId], [Username], [Password]) VALUES (3, N'super', N'super')
GO
SET IDENTITY_INSERT [dbo].[UsersTbl] OFF
GO

--UserDetailsTbl
INSERT [dbo].[UserDetailsTbl] ([UserId], [RoleId], [UserTypeId], [UserFirstName], [UserLastName], [UserEmail]) VALUES (1, 100, 1, N'Param', N'Singh', N'papu@singh.com')
GO
INSERT [dbo].[UserDetailsTbl] ([UserId], [RoleId], [UserTypeId], [UserFirstName], [UserLastName], [UserEmail]) VALUES (2, 200, 1, N'Shaminder', N'Hayabusa', N'shaminder@shaminder.com')
GO
INSERT [dbo].[UserDetailsTbl] ([UserId], [RoleId], [UserTypeId], [UserFirstName], [UserLastName], [UserEmail]) VALUES (3, 300, 1, N'Super', N'User', N'super@user.com')
GO