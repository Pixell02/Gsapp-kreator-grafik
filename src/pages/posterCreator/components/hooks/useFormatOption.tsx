type Format = {
  [key: string]: string;
};

const useFormatOption = () => {
  const defaultSquad =
    "Nazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko";
  const defaultReserve =
    "Nazwisko Nazwisko Nazwisko Nazwisko Nazwisko Nazwisko Nazwisko Nazwisko Nazwisko Nazwisko Nazwisko";
  const squadOptions: Format = {
    dotted:
      "88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko",
    NumSurName:
      "88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko",
    NumDotSurName:
      "88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko",
    oneDot:
      "88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko",
  };
  const reserveOptions: Format = {
    dotted:
      "88.I.Nazwisko 88.I.Nazwisko 88.I.Nazwisko 88.I.Nazwisko 88.I.Nazwisko 88.I.Nazwisko 88.I.Nazwisko 88.I.Nazwisko 88.I.Nazwisko 88.I.Nazwisko 88.I.Nazwisko",
    NumSurName:
      "88 Nazwisko 88 Nazwisko 88 Nazwisko 88 Nazwisko 88 Nazwisko 88 Nazwisko 88 Nazwisko 88 Nazwisko 88 Nazwisko 88 Nazwisko 88 Nazwisko",
    NumDotSurName:
      "88.Nazwisko 88.Nazwisko 88.Nazwisko 88.Nazwisko 88.Nazwisko 88.Nazwisko 88.Nazwisko 88.Nazwisko 88.Nazwisko 88.Nazwisko 88.Nazwisko",
    oneDot:
      "88 I.Nazwisko 88 I.Nazwisko 88 I.Nazwisko 88 I.Nazwisko 88 I.Nazwisko 88 I.Nazwisko 88 I.Nazwisko 88 I.Nazwisko 88 I.Nazwisko 88 I.Nazwisko 88 I.Nazwisko",
  };

  return { squadOptions, defaultSquad, defaultReserve, reserveOptions };
};

export default useFormatOption;
