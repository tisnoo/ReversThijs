using Microsoft.EntityFrameworkCore.Migrations;

namespace ReversiApp.Migrations
{
    public partial class dbInit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Spellen",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Omschrijving = table.Column<string>(nullable: true),
                    Token = table.Column<string>(nullable: true),
                    BordJson = table.Column<string>(nullable: true),
                    AandeBeurt = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Spellen", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Speler",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naam = table.Column<string>(nullable: true),
                    Wachtwoord = table.Column<string>(nullable: true),
                    Token = table.Column<string>(nullable: true),
                    Kleur = table.Column<int>(nullable: false),
                    spelId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Speler", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Speler_Spellen_spelId",
                        column: x => x.spelId,
                        principalTable: "Spellen",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Speler_spelId",
                table: "Speler",
                column: "spelId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Speler");

            migrationBuilder.DropTable(
                name: "Spellen");
        }
    }
}
