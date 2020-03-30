using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ReversiApp.Models
{
        public enum ZetType { HL, HR, VO, VB, DLO, DRB, DRO, DLB };

        public class Spel : ISpel
        {
            public int ID { get; set; }
            public string Omschrijving { get; set; }
            public string Token { get; set; }
            public ICollection<Users> Spelers { get; set; }
            [NotMapped]
            public Kleur[,] Bord { get; set; }
            public string BordJson { get; set; }
            public Kleur AandeBeurt { get; set; }
            [NotMapped]
            public List<List<int>> PuntenHistorie { get; set; }
            public string PuntenHistorieJson { get; set; }
            private List<ZetType> typeZet;
       
            
            public Spel()
            {

            //Lijst voor zetTypes
            typeZet = new List<ZetType>();

            //Maak list aan
            PuntenHistorie = new List<List<int>>();

            //Add lists to list
            PuntenHistorie.Add(new List<int>());
            PuntenHistorie.Add(new List<int>());


            //Creeër nieuw bord
            Bord = new Kleur[8, 8];
                
                //Vul het bord.
                for (int y = 0; y < Bord.GetLength(0); y++)
                {
                    for (int x = 0; x < y; x++)
                    {
                        Bord[y, x] = 0;
                    }
                }

                //Zet beginposities;

                //Voor wit
                Bord[3, 3] = Kleur.Wit;
                Bord[4, 4] = Kleur.Wit;

                //Voor zwart
                Bord[3, 4] = Kleur.Zwart;
                Bord[4, 3] = Kleur.Zwart;


            PuntenHistorieJson = JsonConvert.SerializeObject(PuntenHistorie);
            addToHistory();


        }


            public bool Afgelopen()
            {
                for (int y = 0; y < Bord.GetLength(0); y++)
                {
                    for (int x = 0; x < Bord.GetLength(0); x++)
                    {
                        if (Bord[y, x] == Kleur.Geen)
                            if (ZetMogelijk(y, x))
                                return false;
                    }
                }
                return true;
            }
        public int scorePlayerWhite()
        {
            int score = 0;
            for (int y = 0; y < Bord.GetLength(0); y++)
            {
                for (int x = 0; x < Bord.GetLength(0); x++)
                {
                    if (Bord[y, x] == Kleur.Wit)
                    {
                        score++;
                    }
                }
            }
            return score;
        }

        public int scorePlayerBlack()
        {
            int score = 0;
            for (int y = 0; y < Bord.GetLength(0); y++)
            {
                for (int x = 0; x < Bord.GetLength(0); x++)
                {
                    if (Bord[y, x] == Kleur.Zwart)
                    {
                        score++;
                    }
                }
            }
            return score;
        }

            public int[] score()
        {
           

            int[] returnvalue = { scorePlayerWhite(),scorePlayerBlack()};
            return returnvalue;
        }

            public bool DoeZet(int rijZet, int kolomZet)
            {
                if (ZetMogelijk(rijZet, kolomZet))
                {
                    Bord[rijZet, kolomZet] = AandeBeurt;

                foreach (var zet in typeZet)
                {
                    if (zet == ZetType.HL)
                        DoeZetHL(rijZet, kolomZet);

                    else if (zet == ZetType.HR)
                        DoeZetHR(rijZet, kolomZet);


                    else if (zet == ZetType.VO)
                        DoeZetVO(rijZet, kolomZet);


                    else if (zet == ZetType.VB)
                        DoeZetVB(rijZet, kolomZet);


                    else if (zet == ZetType.DLB)
                        DoeZetDLB(rijZet, kolomZet);


                    else if (zet == ZetType.DRO)
                        DoeZetDRO(rijZet, kolomZet);


                    else if (zet == ZetType.DLO)
                        DoeZetDLO(rijZet, kolomZet);


                    else if (zet == ZetType.DRB)
                        DoeZetDRB(rijZet, kolomZet);
                    }

                Pas();
                addToHistory();
                return true;

            }


            return false;
                }
           

            public void addToHistory()
        {

            PuntenHistorie = JsonConvert.DeserializeObject<List<List<int>>>(PuntenHistorieJson);


            PuntenHistorie[0].Add(scorePlayerWhite());
            PuntenHistorie[1].Add(scorePlayerBlack());


            PuntenHistorieJson = JsonConvert.SerializeObject(PuntenHistorie);
        }

            public Kleur OverwegendeKleur()
            {
                int zwartKleurig = 0;
                int witKleuring = 0;

                for (int y = 0; y < Bord.GetLength(0); y++)
                {
                    for (int x = 0; x < Bord.GetLength(0); x++)
                    {
                        if (Bord[y, x] == Kleur.Zwart)
                            zwartKleurig++;
                        else if (Bord[y, x] == Kleur.Wit)
                            witKleuring++;
                    }
                }

                if (zwartKleurig > witKleuring)
                    return Kleur.Zwart;
                else if (witKleuring > zwartKleurig)
                    return Kleur.Wit;
                else
                    return Kleur.Geen;
            }

            public bool Pas()
            {
                if (AandeBeurt == Kleur.Wit)
                    AandeBeurt = Kleur.Zwart;
                else
                    AandeBeurt = Kleur.Wit;
                return true;
            }

            public bool ZetMogelijk(int rijZet, int kolomZet)
            {
            //If the index is outside of the board or there is already a color on the location, return false, else return true
            //Check eerst of het blok uberhaupt geplaatst kan worden, of er niet al een kleur aan gebonden is.

            //Maak eerst de zettype lijst leeg, zodat deze weer ingevuld kan worden
                typeZet.Clear();

                try
                {
                    if (Bord[rijZet, kolomZet] != Kleur.Geen)
                    {
                        return false;
                    }
                }
                catch (Exception e)
                {
                    return false;
                }

            checkHorizontal(rijZet, kolomZet);
            checkVertical(rijZet, kolomZet);
            checkDiagnol(rijZet, kolomZet);

            if (typeZet.Count > 0)
            {
                return true;
            }

                return false;
            }

            public bool checkHorizontal(int rijZet, int kolomZet)
            {
                //Horizontal 


                //Check right line -> +++++ Als er minimaal 1 van de andere kleur naast zit.

                try
                {
                    if (Bord[rijZet, kolomZet + 1] != Kleur.Geen && Bord[rijZet, kolomZet + 1] != AandeBeurt)
                    {
                        for (int x = kolomZet + 2; x < Bord.GetLength(0); x++)
                        {
                            if (Bord[rijZet, x] == AandeBeurt)
                            {
                                typeZet.Add(ZetType.HR);
                                return true;
                            }
                            else if (Bord[rijZet, x] == Kleur.Geen)
                            {
                                break;
                            }
                        }
                    }
                }
                catch (Exception e) { }
                //Check left line -> ---- Als er minimaal 1 van de andere kleur naast zit.
                try
                {
                    if (Bord[rijZet, kolomZet - 1] != Kleur.Geen && Bord[rijZet, kolomZet - 1] != AandeBeurt)
                    {
                        for (int x = kolomZet - 2; x >= 0; x--)
                        {
                            if (Bord[rijZet, x] == AandeBeurt)
                            {
                                typeZet.Add(ZetType.HL);
                                return true;
                            }
                            else if (Bord[rijZet, x] == Kleur.Geen)
                            {
                                break;
                            }
                        }
                    }
                }
                catch (Exception e) { }
                return false;
            }


            public bool checkVertical(int rijZet, int kolomZet)
            {
                //Vertical 

                try
                {
                    //Check beneath line -> +++++ Als er minimaal 1 van de andere kleur naast zit.
                    if (Bord[rijZet + 1, kolomZet] != Kleur.Geen && Bord[rijZet + 1, kolomZet] != AandeBeurt)
                    {
                        for (int y = rijZet + 2; y < Bord.GetLength(0); y++)
                        {
                            if (Bord[y, kolomZet] == AandeBeurt)
                            {
                                typeZet.Add( ZetType.VO);
                                return true;
                            }
                            else if (Bord[y, kolomZet] == Kleur.Geen)
                            {
                                break;
                            }
                        }
                    }
                }
                catch (Exception e) { }
                //above line -> ---- Als er minimaal 1 van de andere kleur naast zit.

                try
                {
                    if (Bord[rijZet - 1, kolomZet] != Kleur.Geen && Bord[rijZet - 1, kolomZet] != AandeBeurt)
                    {
                        for (int y = kolomZet - 2; y >= 0; y--)
                        {
                            if (Bord[y, kolomZet] == AandeBeurt)
                            {
                                typeZet.Add( ZetType.VB);
                                return true;
                            }
                            else if (Bord[y, kolomZet] == Kleur.Geen)
                            {
                                break;
                            }
                        }
                    }
                }
                catch (Exception e) { }
                return false;
            }

            public bool checkDiagnol(int rijZet, int kolomZet)
            {
                //Eerst van linksboven naar rechtsonder

                //Check de positie linksboven, catch die als de positie kleiner is dan 0
                try
                {
                    if (Bord[rijZet - 1, kolomZet - 1] != Kleur.Geen && Bord[rijZet - 1, kolomZet - 1] != AandeBeurt)
                    {
                        int x = kolomZet - 2;
                        int y = rijZet - 2;

                        while (x >= 0 && y >= 0)
                        {
                            if (Bord[y, x] == AandeBeurt)
                            {
                                typeZet.Add(ZetType.DLB);
                                return true;
                            }
                            else if (Bord[y, x] == Kleur.Geen)
                                break;


                            x--;
                            y--;
                        }
                    }
                }
                catch (Exception e) { }

                //Check de positie rechtsonder, catch die als de positie groter is dan het bord
                try
                {
                    if (Bord[rijZet + 1, kolomZet + 1] != Kleur.Geen && Bord[rijZet + 1, kolomZet + 1] != AandeBeurt)
                    {
                        int x = kolomZet + 2;
                        int y = rijZet + 2;

                        while (x < Bord.GetLength(0) && y < Bord.GetLength(0))
                        {
                            if (Bord[y, x] == AandeBeurt)
                            {
                                typeZet.Add(ZetType.DRO);
                                return true;
                            }
                            else if (Bord[y, x] == Kleur.Geen)
                                break;


                            x++;
                            y++;
                        }
                    }
                }
                catch (Exception e) { }

                //Dan van rechtsboven naar linksonder.

                //Check de positie rechtsboven, catch die als de positie kleiner is dan 0
                try
                {
                    if (Bord[rijZet - 1, kolomZet + 1] != Kleur.Geen && Bord[rijZet - 1, kolomZet + 1] != AandeBeurt)
                    {
                        int x = kolomZet + 2;
                        int y = rijZet - 2;

                        while (x < Bord.GetLength(0) && y >= 0)
                        {
                            if (Bord[y, x] == AandeBeurt)
                            {
                                typeZet.Add(ZetType.DRB);
                                return true;
                            }
                            else if (Bord[y, x] == Kleur.Geen)
                                break;


                            x++;
                            y--;
                        }
                    }
                }
                catch (Exception e) { }

                //Check de positie linksonder, catch die als de positie groter is dan het bord
                try
                {
                    if (Bord[rijZet + 1, kolomZet - 1] != Kleur.Geen && Bord[rijZet + 1, kolomZet - 1] != AandeBeurt)
                    {
                        int x = kolomZet - 2;
                        int y = rijZet + 2;

                        while (x >= 0 && y < Bord.GetLength(0))
                        {
                            if (Bord[y, x] == AandeBeurt)
                            {
                                typeZet.Add(ZetType.DLO);
                                return true;
                            }
                            else if (Bord[y, x] == Kleur.Geen)
                                break;


                            x--;
                            y++;
                        }
                    }
                }
                catch (Exception e) { }

                return false;
            }

            private void DoeZetHL(int y, int x)
            {
                for (int tempX = x - 1; tempX >= 0; tempX--)
                {
                    if (Bord[y, tempX] != AandeBeurt)
                        Bord[y, tempX] = AandeBeurt;
                    else
                        break;
                }
            }

            private void DoeZetHR(int y, int x)
            {
                for (int tempX = x + 1; tempX < Bord.GetLength(0); tempX++)
                {
                    if (Bord[y, tempX] != AandeBeurt)
                        Bord[y, tempX] = AandeBeurt;
                    else
                        break;
                }
            }

            private void DoeZetVB(int y, int x)
            {
                for (int tempY = y - 1; tempY >= 0; tempY--)
                {
                    if (Bord[tempY, x] != AandeBeurt)
                        Bord[tempY, x] = AandeBeurt;
                    else
                        break;
                }
            }

            private void DoeZetVO(int y, int x)
            {
                for (int tempY = y + 1; tempY < Bord.GetLength(0); tempY++)
                {
                    if (Bord[tempY, x] != AandeBeurt)
                        Bord[tempY, x] = AandeBeurt;
                    else
                        break;
                }
            }

            private void DoeZetDLB(int y, int x)
            {
                while (y >= 0 && x >= 0)
                {
                    y--;
                    x--;

                    if (Bord[y, x] != AandeBeurt)
                        Bord[y, x] = AandeBeurt;
                    else
                        break;

                }
            }

            private void DoeZetDRO(int y, int x)
            {
                while (y < Bord.GetLength(0) && x < Bord.GetLength(0))
                {
                    y++;
                    x++;

                    if (Bord[y, x] != AandeBeurt)
                        Bord[y, x] = AandeBeurt;
                    else
                        break;


                }
            }

            private void DoeZetDRB(int y, int x)
            {
                while (y >= 0 && x < Bord.GetLength(0))
                {
                    y--;
                    x++;

                    if (Bord[y, x] != AandeBeurt)
                        Bord[y, x] = AandeBeurt;
                    else
                        break;

                }
            }

            private void DoeZetDLO(int y, int x)
            {
                while (y < Bord.GetLength(0) && x >= 0)
                {
                    y++;
                    x--;

                    if (Bord[y, x] != AandeBeurt)
                        Bord[y, x] = AandeBeurt;
                    else
                        break;

                }
            }



        }
        }
   
