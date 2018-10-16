INSERT [dbo].[RolesTbl] ([RoleId], [RoleName]) VALUES (1, N'Agent')
GO

INSERT [dbo].[UserTypesTbl] ([UserTypeId], [UserTypeName]) VALUES (1, N'NormalAgent')
GO

SET IDENTITY_INSERT [dbo].[UsersTbl] ON 
GO
INSERT [dbo].[UsersTbl] ([UserId], [Username], [Password]) VALUES (1, N'psingh', N'psingh')
GO
SET IDENTITY_INSERT [dbo].[UsersTbl] OFF
GO

INSERT [dbo].[UserDetailsTbl] ([UserId], [RoleId], [UserTypeId], [UserFirstName], [UserLastName], [UserEmail]) VALUES (1, 1, 1, N'Param', N'Singh', N'papu@singh.com')
GO


