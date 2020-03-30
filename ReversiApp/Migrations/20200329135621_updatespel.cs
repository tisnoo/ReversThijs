using Microsoft.EntityFrameworkCore.Migrations;

namespace ReversiApp.Migrations
{
    public partial class updatespel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Kleur",
                table: "Users",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "PuntenHistorieJson",
                table: "Spellen",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PuntenHistorieJson",
                table: "Spellen");

            migrationBuilder.AlterColumn<int>(
                name: "Kleur",
                table: "Users",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
