USE [EnergyDB]
GO

ALTER TABLE [dbo].[UserDetailsTbl] DROP CONSTRAINT [FK_UserType_UserDetails]
GO

ALTER TABLE [dbo].[UserDetailsTbl] DROP CONSTRAINT [FK_User_UserDetails]
GO

ALTER TABLE [dbo].[UserDetailsTbl] DROP CONSTRAINT [FK_Role_UserDetails]
GO

ALTER TABLE [dbo].[UserDetailsTbl] DROP CONSTRAINT [FK__UserDetai__UserT__412EB0B6]
GO

ALTER TABLE [dbo].[UserContentTbl] DROP CONSTRAINT [FK_User_UserContent]
GO

ALTER TABLE [dbo].[UserContentTbl] DROP CONSTRAINT [FK_Content_UserContent]
GO

/****** Object:  Table [dbo].[UserTypesTbl]    Script Date: 10/12/2018 1:21:39 PM ******/
DROP TABLE [dbo].[UserTypesTbl]
GO

/****** Object:  Table [dbo].[UsersTbl]    Script Date: 10/12/2018 1:21:39 PM ******/
DROP TABLE [dbo].[UsersTbl]
GO

/****** Object:  Table [dbo].[UserDetailsTbl]    Script Date: 10/12/2018 1:21:39 PM ******/
DROP TABLE [dbo].[UserDetailsTbl]
GO

/****** Object:  Table [dbo].[UserContentTbl]    Script Date: 10/12/2018 1:21:39 PM ******/
DROP TABLE [dbo].[UserContentTbl]
GO

/****** Object:  Table [dbo].[RolesTbl]    Script Date: 10/12/2018 1:21:39 PM ******/
DROP TABLE [dbo].[RolesTbl]
GO

/****** Object:  Table [dbo].[ContentTbl]    Script Date: 10/12/2018 1:21:39 PM ******/
DROP TABLE [dbo].[ContentTbl]
GO

/****** Object:  Table [dbo].[ContentTbl]    Script Date: 10/12/2018 1:21:39 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ContentTbl](
	[ContentId] [int] NOT NULL,
	[ContentURL] [nvarchar](1000) NULL,
	[ContentName] [nvarchar](50) NULL,
	[ContentType] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[ContentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

/****** Object:  Table [dbo].[RolesTbl]    Script Date: 10/12/2018 1:21:39 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[RolesTbl](
	[RoleId] [int] NOT NULL,
	[RoleName] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

/****** Object:  Table [dbo].[UserContentTbl]    Script Date: 10/12/2018 1:21:39 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[UserContentTbl](
	[UserId] [int] NOT NULL,
	[ContentId] [int] NOT NULL,
	[IsComplete] [tinyint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[ContentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

/****** Object:  Table [dbo].[UserDetailsTbl]    Script Date: 10/12/2018 1:21:39 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[UserDetailsTbl](
	[UserId] [int] NOT NULL,
	[RoleId] [int] NOT NULL,
	[UserTypeId] [int] NOT NULL,
	[UserFirstName] [nvarchar](50) NOT NULL,
	[UserLastName] [nvarchar](50) NULL,
	[UserEmail] [nchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

/****** Object:  Table [dbo].[UsersTbl]    Script Date: 10/12/2018 1:21:39 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[UsersTbl](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[Username] [varchar](50) NOT NULL,
	[Password] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

/****** Object:  Table [dbo].[UserTypesTbl]    Script Date: 10/12/2018 1:21:39 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[UserTypesTbl](
	[UserTypeId] [int] NOT NULL,
	[UserTypeName] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[UserTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[UserContentTbl]  WITH CHECK ADD  CONSTRAINT [FK_Content_UserContent] FOREIGN KEY([ContentId])
REFERENCES [dbo].[ContentTbl] ([ContentId])
GO

ALTER TABLE [dbo].[UserContentTbl] CHECK CONSTRAINT [FK_Content_UserContent]
GO

ALTER TABLE [dbo].[UserContentTbl]  WITH CHECK ADD  CONSTRAINT [FK_User_UserContent] FOREIGN KEY([UserId])
REFERENCES [dbo].[UsersTbl] ([UserId])
GO

ALTER TABLE [dbo].[UserContentTbl] CHECK CONSTRAINT [FK_User_UserContent]
GO

ALTER TABLE [dbo].[UserDetailsTbl]  WITH CHECK ADD FOREIGN KEY([UserTypeId])
REFERENCES [dbo].[UsersTbl] ([UserId])
GO

ALTER TABLE [dbo].[UserDetailsTbl]  WITH CHECK ADD  CONSTRAINT [FK_Role_UserDetails] FOREIGN KEY([RoleId])
REFERENCES [dbo].[RolesTbl] ([RoleId])
GO

ALTER TABLE [dbo].[UserDetailsTbl] CHECK CONSTRAINT [FK_Role_UserDetails]
GO

ALTER TABLE [dbo].[UserDetailsTbl]  WITH CHECK ADD  CONSTRAINT [FK_User_UserDetails] FOREIGN KEY([UserId])
REFERENCES [dbo].[UsersTbl] ([UserId])
GO

ALTER TABLE [dbo].[UserDetailsTbl] CHECK CONSTRAINT [FK_User_UserDetails]
GO

ALTER TABLE [dbo].[UserDetailsTbl]  WITH CHECK ADD  CONSTRAINT [FK_UserType_UserDetails] FOREIGN KEY([UserTypeId])
REFERENCES [dbo].[UserTypesTbl] ([UserTypeId])
GO

ALTER TABLE [dbo].[UserDetailsTbl] CHECK CONSTRAINT [FK_UserType_UserDetails]
GO


