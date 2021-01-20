export const warehouseList = [
    {
        "Id_Magazyn": 1,
        "Adres": "ul. Górka 15/67",
        "Nazwa": "Magazyn na górce"
    },
    {
        "Id_Magazyn": 2,
        "Adres": "ul. Dołek 9",
        "Nazwa": "Magazyn w dołku"
    }
]

export const warehouseDetailsList = [
    {
        "Id_Magazyn": 1,
        "Adres": "ul. Górka 15/67",
        "Nazwa": "Magazyn na górce",
        "stanyWMagazynach": [
            {
                "Id_StanWMagazynie": 1,
                "Ksiazka_Id_Ksiazka": 1,
                "Magazyn_Id_Magazyn": 1,
                "IloscNaStanie": "1000",
                "CenaHurtowa": "20.50",
                "MinimalnaIloscDoCenyHurtowej": "100",
                "CenaDetaliczna": "30.50",
                "ksiazka": {
                    "Id_Ksiazka": 1,
                    "Tytul": "Lew, czarownica i stara szafa",
                    "Autor": "C.S. Lewis",
                    "DataWydania": "1950-01-01"
                }
            },
            {
                "Id_StanWMagazynie": 2,
                "Ksiazka_Id_Ksiazka": 2,
                "Magazyn_Id_Magazyn": 1,
                "IloscNaStanie": "5000",
                "CenaHurtowa": "18.50",
                "MinimalnaIloscDoCenyHurtowej": "20",
                "CenaDetaliczna": "35.50",
                "ksiazka": {
                    "Id_Ksiazka": 2,
                    "Tytul": "Książę Kaspian",
                    "Autor": "C.S. Lewis",
                    "DataWydania": "1951-01-01"
                }
            }
        ]
    },
    {
        "Id_Magazyn": 2,
        "Adres": "ul. Dołek 9",
        "Nazwa": "Magazyn w dołku",
        "stanyWMagazynach": [
            {
                "Id_StanWMagazynie": 3,
                "Ksiazka_Id_Ksiazka": 1,
                "Magazyn_Id_Magazyn": 2,
                "IloscNaStanie": "15000",
                "CenaHurtowa": "40.50",
                "MinimalnaIloscDoCenyHurtowej": "300",
                "CenaDetaliczna": "45.90",
                "ksiazka": {
                    "Id_Ksiazka": 1,
                    "Tytul": "Lew, czarownica i stara szafa",
                    "Autor": "C.S. Lewis",
                    "DataWydania": "1950-01-01"
                }
            }
        ]
    }
]