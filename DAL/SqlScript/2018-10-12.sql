IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_UserType_UserDetails]') AND parent_object_id = OBJECT_ID(N'[dbo].[UserDetailsTbl]'))
ALTER TABLE [dbo].[UserDetailsTbl] DROP CONSTRAINT [FK_UserType_UserDetails]
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_UserDetailsTbl_UserDetails_ModifiedBy]') AND parent_object_id = OBJECT_ID(N'[dbo].[UserDetailsTbl]'))
ALTER TABLE [dbo].[UserDetailsTbl] DROP CONSTRAINT [FK_UserDetailsTbl_UserDetails_ModifiedBy]
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_UserDetailsTbl_UserDetails_CreatedBy]') AND parent_object_id = OBJECT_ID(N'[dbo].[UserDetailsTbl]'))
ALTER TABLE [dbo].[UserDetailsTbl] DROP CONSTRAINT [FK_UserDetailsTbl_UserDetails_CreatedBy]
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_User_UserDetails]') AND parent_object_id = OBJECT_ID(N'[dbo].[UserDetailsTbl]'))
ALTER TABLE [dbo].[UserDetailsTbl] DROP CONSTRAINT [FK_User_UserDetails]
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Role_UserDetails]') AND parent_object_id = OBJECT_ID(N'[dbo].[UserDetailsTbl]'))
ALTER TABLE [dbo].[UserDetailsTbl] DROP CONSTRAINT [FK_Role_UserDetails]
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_UserDetailsTbl_UserContent]') AND parent_object_id = OBJECT_ID(N'[dbo].[UserContentTbl]'))
ALTER TABLE [dbo].[UserContentTbl] DROP CONSTRAINT [FK_UserDetailsTbl_UserContent]
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Content_UserContent]') AND parent_object_id = OBJECT_ID(N'[dbo].[UserContentTbl]'))
ALTER TABLE [dbo].[UserContentTbl] DROP CONSTRAINT [FK_Content_UserContent]
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_UserDetailsTbl_ContentTbl_ModifiedBy]') AND parent_object_id = OBJECT_ID(N'[dbo].[ContentTbl]'))
ALTER TABLE [dbo].[ContentTbl] DROP CONSTRAINT [FK_UserDetailsTbl_ContentTbl_ModifiedBy]
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_UserDetailsTbl_ContentTbl_CreatedBy]') AND parent_object_id = OBJECT_ID(N'[dbo].[ContentTbl]'))
ALTER TABLE [dbo].[ContentTbl] DROP CONSTRAINT [FK_UserDetailsTbl_ContentTbl_CreatedBy]
GO
IF  EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[dbo].[DF__UserConte__DateC__28B808A7]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[UserContentTbl] DROP CONSTRAINT [DF__UserConte__DateC__28B808A7]
END

GO
IF  EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[dbo].[DF__ContentTb__Modif__2B947552]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[ContentTbl] DROP CONSTRAINT [DF__ContentTb__Modif__2B947552]
END

GO
IF  EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[dbo].[DF__ContentTb__Creat__2AA05119]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[ContentTbl] DROP CONSTRAINT [DF__ContentTb__Creat__2AA05119]
END

GO
IF  EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[dbo].[DF__ContentTb__IsDel__29AC2CE0]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[ContentTbl] DROP CONSTRAINT [DF__ContentTb__IsDel__29AC2CE0]
END

GO


/****** Object:  Table [dbo].[UserTypesTbl]    Script Date: 10/27/2018 12:57:33 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[UserTypesTbl]') AND type in (N'U'))
DROP TABLE [dbo].[UserTypesTbl]
GO
/****** Object:  Table [dbo].[UsersTbl]    Script Date: 10/27/2018 12:57:33 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[UsersTbl]') AND type in (N'U'))
DROP TABLE [dbo].[UsersTbl]
GO
/****** Object:  Table [dbo].[UserDetailsTbl]    Script Date: 10/27/2018 12:57:33 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[UserDetailsTbl]') AND type in (N'U'))
DROP TABLE [dbo].[UserDetailsTbl]
GO
/****** Object:  Table [dbo].[UserContentTbl]    Script Date: 10/27/2018 12:57:33 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[UserContentTbl]') AND type in (N'U'))
DROP TABLE [dbo].[UserContentTbl]
GO
/****** Object:  Table [dbo].[RolesTbl]    Script Date: 10/27/2018 12:57:33 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[RolesTbl]') AND type in (N'U'))
DROP TABLE [dbo].[RolesTbl]
GO
/****** Object:  Table [dbo].[ContentTbl]    Script Date: 10/27/2018 12:57:33 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ContentTbl]') AND type in (N'U'))
DROP TABLE [dbo].[ContentTbl]
GO


/****** Object:  Table [dbo].[ContentTbl]    Script Date: 10/27/2018 12:57:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ContentTbl]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[ContentTbl](
	[ContentId] [int] NOT NULL,
	[ContentURL] [nvarchar](1000) NULL,
	[ContentName] [nvarchar](50) NULL,
	[ContentType] [nvarchar](50) NULL,
	[IsDeleted] [bit] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
 CONSTRAINT [PK__ContentT__2907A81EC21889DA] PRIMARY KEY CLUSTERED 
(
	[ContentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
/****** Object:  Table [dbo].[RolesTbl]    Script Date: 10/27/2018 12:57:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[RolesTbl]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[RolesTbl](
	[RoleId] [int] NOT NULL,
	[RoleDisplayName] [varchar](50) NOT NULL,
	[RoleName] [varchar](50) NOT NULL,
 CONSTRAINT [PK__RolesTbl__8AFACE1A8AC28340] PRIMARY KEY CLUSTERED 
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[UserContentTbl]    Script Date: 10/27/2018 12:57:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[UserContentTbl]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[UserContentTbl](
	[UserId] [int] NOT NULL,
	[ContentId] [int] NOT NULL,
	[IsComplete] [tinyint] NOT NULL,
	[DateCompleted] [datetime] NOT NULL,
 CONSTRAINT [PK__UserCont__E518B6CDEBECD15A] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[ContentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
/****** Object:  Table [dbo].[UserDetailsTbl]    Script Date: 10/27/2018 12:57:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[UserDetailsTbl]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[UserDetailsTbl](
	[UserId] [int] NOT NULL,
	[RoleId] [int] NOT NULL,
	[UserTypeId] [int] NOT NULL,
	[UserFirstName] [nvarchar](50) NOT NULL,
	[UserLastName] [nvarchar](50) NULL,
	[UserEmail] [nvarchar](50) NULL,
	[IsDeleted] [bit] NOT NULL CONSTRAINT [DF__UserDetai__IsDel__2C88998B]  DEFAULT ((0)),
	[CreatedDate] [datetime] NOT NULL CONSTRAINT [DF__UserDetai__Creat__2D7CBDC4]  DEFAULT (getdate()),
	[CreatedBy] [int] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL CONSTRAINT [DF__UserDetai__Modif__2E70E1FD]  DEFAULT (getdate()),
	[ModifiedBy] [int] NOT NULL,
 CONSTRAINT [PK__UserDeta__1788CC4CEE3967B5] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
/****** Object:  Table [dbo].[UsersTbl]    Script Date: 10/27/2018 12:57:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[UsersTbl]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[UsersTbl](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[Username] [varchar](50) NOT NULL,
	[Password] [varchar](50) NOT NULL,
 CONSTRAINT [PK__UsersTbl__1788CC4C52A3DACF] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[UserTypesTbl]    Script Date: 10/27/2018 12:57:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[UserTypesTbl]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[UserTypesTbl](
	[UserTypeId] [int] NOT NULL,
	[UserTypeDisplayName] [nvarchar](50) NOT NULL,
	[UserTypeName] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK__UserType__40D2D816E327DD52] PRIMARY KEY CLUSTERED 
(
	[UserTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[dbo].[DF__ContentTb__IsDel__29AC2CE0]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[ContentTbl] ADD  CONSTRAINT [DF__ContentTb__IsDel__29AC2CE0]  DEFAULT ((0)) FOR [IsDeleted]
END

GO
IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[dbo].[DF__ContentTb__Creat__2AA05119]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[ContentTbl] ADD  CONSTRAINT [DF__ContentTb__Creat__2AA05119]  DEFAULT (getdate()) FOR [CreatedDate]
END

GO
IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[dbo].[DF__ContentTb__Modif__2B947552]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[ContentTbl] ADD  CONSTRAINT [DF__ContentTb__Modif__2B947552]  DEFAULT (getdate()) FOR [ModifiedDate]
END

GO
IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[dbo].[DF__UserConte__DateC__28B808A7]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[UserContentTbl] ADD  CONSTRAINT [DF__UserConte__DateC__28B808A7]  DEFAULT (getdate()) FOR [DateCompleted]
END

GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_UserDetailsTbl_ContentTbl_CreatedBy]') AND parent_object_id = OBJECT_ID(N'[dbo].[ContentTbl]'))
ALTER TABLE [dbo].[ContentTbl]  WITH CHECK ADD  CONSTRAINT [FK_UserDetailsTbl_ContentTbl_CreatedBy] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[UserDetailsTbl] ([UserId])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_UserDetailsTbl_ContentTbl_CreatedBy]') AND parent_object_id = OBJECT_ID(N'[dbo].[ContentTbl]'))
ALTER TABLE [dbo].[ContentTbl] CHECK CONSTRAINT [FK_UserDetailsTbl_ContentTbl_CreatedBy]
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_UserDetailsTbl_ContentTbl_ModifiedBy]') AND parent_object_id = OBJECT_ID(N'[dbo].[ContentTbl]'))
ALTER TABLE [dbo].[ContentTbl]  WITH CHECK ADD  CONSTRAINT [FK_UserDetailsTbl_ContentTbl_ModifiedBy] FOREIGN KEY([ModifiedBy])
REFERENCES [dbo].[UserDetailsTbl] ([UserId])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_UserDetailsTbl_ContentTbl_ModifiedBy]') AND parent_object_id = OBJECT_ID(N'[dbo].[ContentTbl]'))
ALTER TABLE [dbo].[ContentTbl] CHECK CONSTRAINT [FK_UserDetailsTbl_ContentTbl_ModifiedBy]
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Content_UserContent]') AND parent_object_id = OBJECT_ID(N'[dbo].[UserContentTbl]'))
ALTER TABLE [dbo].[UserContentTbl]  WITH CHECK ADD  CONSTRAINT [FK_Content_UserContent] FOREIGN KEY([ContentId])
REFERENCES [dbo].[ContentTbl] ([ContentId])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Content_UserContent]') AND parent_object_id = OBJECT_ID(N'[dbo].[UserContentTbl]'))
ALTER TABLE [dbo].[UserContentTbl] CHECK CONSTRAINT [FK_Content_UserContent]
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_UserDetailsTbl_UserContent]') AND parent_object_id = OBJECT_ID(N'[dbo].[UserContentTbl]'))
ALTER TABLE [dbo].[UserContentTbl]  WITH CHECK ADD  CONSTRAINT [FK_UserDetailsTbl_UserContent] FOREIGN KEY([UserId])
REFERENCES [dbo].[UserDetailsTbl] ([UserId])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_UserDetailsTbl_UserContent]') AND parent_object_id = OBJECT_ID(N'[dbo].[UserContentTbl]'))
ALTER TABLE [dbo].[UserContentTbl] CHECK CONSTRAINT [FK_UserDetailsTbl_UserContent]
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Role_UserDetails]') AND parent_object_id = OBJECT_ID(N'[dbo].[UserDetailsTbl]'))
ALTER TABLE [dbo].[UserDetailsTbl]  WITH CHECK ADD  CONSTRAINT [FK_Role_UserDetails] FOREIGN KEY([RoleId])
REFERENCES [dbo].[RolesTbl] ([RoleId])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Role_UserDetails]') AND parent_object_id = OBJECT_ID(N'[dbo].[UserDetailsTbl]'))
ALTER TABLE [dbo].[UserDetailsTbl] CHECK CONSTRAINT [FK_Role_UserDetails]
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_User_UserDetails]') AND parent_object_id = OBJECT_ID(N'[dbo].[UserDetailsTbl]'))
ALTER TABLE [dbo].[UserDetailsTbl]  WITH CHECK ADD  CONSTRAINT [FK_User_UserDetails] FOREIGN KEY([UserId])
REFERENCES [dbo].[UsersTbl] ([UserId])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_User_UserDetails]') AND parent_object_id = OBJECT_ID(N'[dbo].[UserDetailsTbl]'))
ALTER TABLE [dbo].[UserDetailsTbl] CHECK CONSTRAINT [FK_User_UserDetails]
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_UserDetailsTbl_UserDetails_CreatedBy]') AND parent_object_id = OBJECT_ID(N'[dbo].[UserDetailsTbl]'))
ALTER TABLE [dbo].[UserDetailsTbl]  WITH CHECK ADD  CONSTRAINT [FK_UserDetailsTbl_UserDetails_CreatedBy] FOREIGN KEY([CreatedBy])
REFERENCES [dbo].[UserDetailsTbl] ([UserId])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_UserDetailsTbl_UserDetails_CreatedBy]') AND parent_object_id = OBJECT_ID(N'[dbo].[UserDetailsTbl]'))
ALTER TABLE [dbo].[UserDetailsTbl] CHECK CONSTRAINT [FK_UserDetailsTbl_UserDetails_CreatedBy]
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_UserDetailsTbl_UserDetails_ModifiedBy]') AND parent_object_id = OBJECT_ID(N'[dbo].[UserDetailsTbl]'))
ALTER TABLE [dbo].[UserDetailsTbl]  WITH CHECK ADD  CONSTRAINT [FK_UserDetailsTbl_UserDetails_ModifiedBy] FOREIGN KEY([ModifiedBy])
REFERENCES [dbo].[UserDetailsTbl] ([UserId])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_UserDetailsTbl_UserDetails_ModifiedBy]') AND parent_object_id = OBJECT_ID(N'[dbo].[UserDetailsTbl]'))
ALTER TABLE [dbo].[UserDetailsTbl] CHECK CONSTRAINT [FK_UserDetailsTbl_UserDetails_ModifiedBy]
GO
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_UserType_UserDetails]') AND parent_object_id = OBJECT_ID(N'[dbo].[UserDetailsTbl]'))
ALTER TABLE [dbo].[UserDetailsTbl]  WITH CHECK ADD  CONSTRAINT [FK_UserType_UserDetails] FOREIGN KEY([UserTypeId])
REFERENCES [dbo].[UserTypesTbl] ([UserTypeId])
GO
IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_UserType_UserDetails]') AND parent_object_id = OBJECT_ID(N'[dbo].[UserDetailsTbl]'))
ALTER TABLE [dbo].[UserDetailsTbl] CHECK CONSTRAINT [FK_UserType_UserDetails]
GO
