using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace clothingAPI.Migrations
{
    /// <inheritdoc />
    public partial class ChangeProductView : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ViewDate",
                table: "ProductViews");

            migrationBuilder.AddColumn<int>(
                name: "Count",
                table: "ProductViews",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Count",
                table: "ProductViews");

            migrationBuilder.AddColumn<DateTime>(
                name: "ViewDate",
                table: "ProductViews",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
