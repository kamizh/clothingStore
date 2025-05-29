using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace clothingAPI.Migrations
{
    /// <inheritdoc />
    public partial class ChoiceProductVariantAndColor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductSizes_ProductVariants_ProductVariantId1",
                table: "ProductSizes");

            migrationBuilder.DropTable(
                name: "ColorProductVariant");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductSizes",
                table: "ProductSizes");

            migrationBuilder.DropIndex(
                name: "IX_ProductSizes_ProductVariantId1",
                table: "ProductSizes");

            migrationBuilder.RenameColumn(
                name: "ProductVariantId1",
                table: "ProductSizes",
                newName: "Id");

            migrationBuilder.AddColumn<int>(
                name: "ColorId",
                table: "ProductVariants",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "ProductVariantId",
                table: "ProductSizes",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "ProductSizes",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductSizes",
                table: "ProductSizes",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_ProductVariants_ColorId",
                table: "ProductVariants",
                column: "ColorId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductSizes_ProductVariantId",
                table: "ProductSizes",
                column: "ProductVariantId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductSizes_ProductVariants_ProductVariantId",
                table: "ProductSizes",
                column: "ProductVariantId",
                principalTable: "ProductVariants",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductVariants_Colors_ColorId",
                table: "ProductVariants",
                column: "ColorId",
                principalTable: "Colors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductSizes_ProductVariants_ProductVariantId",
                table: "ProductSizes");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductVariants_Colors_ColorId",
                table: "ProductVariants");

            migrationBuilder.DropIndex(
                name: "IX_ProductVariants_ColorId",
                table: "ProductVariants");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductSizes",
                table: "ProductSizes");

            migrationBuilder.DropIndex(
                name: "IX_ProductSizes_ProductVariantId",
                table: "ProductSizes");

            migrationBuilder.DropColumn(
                name: "ColorId",
                table: "ProductVariants");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "ProductSizes",
                newName: "ProductVariantId1");

            migrationBuilder.AlterColumn<int>(
                name: "ProductVariantId",
                table: "ProductSizes",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<int>(
                name: "ProductVariantId1",
                table: "ProductSizes",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductSizes",
                table: "ProductSizes",
                column: "ProductVariantId");

            migrationBuilder.CreateTable(
                name: "ColorProductVariant",
                columns: table => new
                {
                    ColorsId = table.Column<int>(type: "integer", nullable: false),
                    ProductVariantsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ColorProductVariant", x => new { x.ColorsId, x.ProductVariantsId });
                    table.ForeignKey(
                        name: "FK_ColorProductVariant_Colors_ColorsId",
                        column: x => x.ColorsId,
                        principalTable: "Colors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ColorProductVariant_ProductVariants_ProductVariantsId",
                        column: x => x.ProductVariantsId,
                        principalTable: "ProductVariants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProductSizes_ProductVariantId1",
                table: "ProductSizes",
                column: "ProductVariantId1");

            migrationBuilder.CreateIndex(
                name: "IX_ColorProductVariant_ProductVariantsId",
                table: "ColorProductVariant",
                column: "ProductVariantsId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductSizes_ProductVariants_ProductVariantId1",
                table: "ProductSizes",
                column: "ProductVariantId1",
                principalTable: "ProductVariants",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
