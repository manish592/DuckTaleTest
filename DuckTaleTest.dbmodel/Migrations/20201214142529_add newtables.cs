using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DuckTaleTest.dbmodel.Migrations
{
    public partial class addnewtables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Studentinfos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Class = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifyOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Studentinfos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StudentSubject",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SubjectName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifyOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentSubject", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StudentInfoLink",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StudentInfoFk = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StudentMarksFk = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Marks = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifyOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentInfoLink", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudentInfoLink_Studentinfos_StudentInfoFk",
                        column: x => x.StudentInfoFk,
                        principalTable: "Studentinfos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StudentInfoLink_StudentSubject_StudentMarksFk",
                        column: x => x.StudentMarksFk,
                        principalTable: "StudentSubject",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StudentInfoLink_StudentInfoFk",
                table: "StudentInfoLink",
                column: "StudentInfoFk");

            migrationBuilder.CreateIndex(
                name: "IX_StudentInfoLink_StudentMarksFk",
                table: "StudentInfoLink",
                column: "StudentMarksFk");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StudentInfoLink");

            migrationBuilder.DropTable(
                name: "Studentinfos");

            migrationBuilder.DropTable(
                name: "StudentSubject");
        }
    }
}
