using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace clothingAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddPoleSizeForCartitemAndOrderItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Size",
                table: "OrderItems",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Size",
                table: "CartItems",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Size",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "Size",
                table: "CartItems");
        }
    }
}
