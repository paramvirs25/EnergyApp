using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DAL.Entities
{
    public partial class DataContext : DbContext
    {
        public DataContext()
        {
        }

        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        public virtual DbSet<ContentTbl> ContentTbl { get; set; }
        public virtual DbSet<RolesTbl> RolesTbl { get; set; }
        public virtual DbSet<UserContentTbl> UserContentTbl { get; set; }
        public virtual DbSet<UserDetailsTbl> UserDetailsTbl { get; set; }
        public virtual DbSet<UsersTbl> UsersTbl { get; set; }
        public virtual DbSet<UserTypesTbl> UserTypesTbl { get; set; }

//        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//        {
//            if (!optionsBuilder.IsConfigured)
//            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
//                optionsBuilder.UseSqlServer("Server=.\\SQLExpress;Database=EnergyDB;User ID=psingh;Password=psingh;");
//            }
//        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ContentTbl>(entity =>
            {
                entity.HasKey(e => e.ContentId);

                entity.Property(e => e.ContentId).ValueGeneratedNever();

                entity.Property(e => e.ContentName).HasMaxLength(50);

                entity.Property(e => e.ContentType).HasMaxLength(50);

                entity.Property(e => e.ContentUrl)
                    .HasColumnName("ContentURL")
                    .HasMaxLength(1000);
            });

            modelBuilder.Entity<RolesTbl>(entity =>
            {
                entity.HasKey(e => e.RoleId);

                entity.Property(e => e.RoleId).ValueGeneratedNever();

                entity.Property(e => e.RoleName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<UserContentTbl>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.ContentId });

                entity.HasOne(d => d.Content)
                    .WithMany(p => p.UserContentTbl)
                    .HasForeignKey(d => d.ContentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Content_UserContent");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserContentTbl)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_UserContent");
            });

            modelBuilder.Entity<UserDetailsTbl>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.Property(e => e.UserId).ValueGeneratedNever();

                entity.Property(e => e.UserEmail).HasMaxLength(10);

                entity.Property(e => e.UserFirstName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.UserLastName).HasMaxLength(50);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.UserDetailsTbl)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Role_UserDetails");

                entity.HasOne(d => d.User)
                    .WithOne(p => p.UserDetailsTblUser)
                    .HasForeignKey<UserDetailsTbl>(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_UserDetails");

                entity.HasOne(d => d.UserType)
                    .WithMany(p => p.UserDetailsTblUserType)
                    .HasForeignKey(d => d.UserTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserDetai__UserT__412EB0B6");

                entity.HasOne(d => d.UserTypeNavigation)
                    .WithMany(p => p.UserDetailsTbl)
                    .HasForeignKey(d => d.UserTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserType_UserDetails");
            });

            modelBuilder.Entity<UsersTbl>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<UserTypesTbl>(entity =>
            {
                entity.HasKey(e => e.UserTypeId);

                entity.Property(e => e.UserTypeId).ValueGeneratedNever();

                entity.Property(e => e.UserTypeName)
                    .IsRequired()
                    .HasMaxLength(50);
            });
        }
    }
}
