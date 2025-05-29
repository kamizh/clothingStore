using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace clothingAPI.Migrations
{
    /// <inheritdoc />
    public partial class ChangeAdminAndAct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Login",
                table: "Admins",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Admins",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Login",
                table: "Admins");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "Admins");
        }
    }
}
