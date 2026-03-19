import moment from "moment";

type internalData = [string, number, string, number | string];
//fecha, monto, tipo, id de categoria de gasto

interface data {
  gasto: internalData[];
  ingreso: internalData[];
}

export function gastoIngresoMes(fecha?: string) {
  const date = fecha ? moment(fecha, "YYYY-MM") : moment();
  const data = localStorage.getItem("data");

  if (data !== null) {
    const parsedData: data = JSON.parse(data);
    parsedData.gasto = parsedData.gasto.filter(
      (el) => moment(el[0]).format("YYYY-MM") === date.format("YYYY-MM"),
    );
    parsedData.ingreso = parsedData.ingreso.filter(
      (el) => moment(el[0]).format("YYYY-MM") === date.format("YYYY-MM"),
    );

    const gastos = parsedData.gasto.reduce((a, b) => a + b[1], 0);
    const ingresos = parsedData.ingreso.reduce((a, b) => a + b[1], 0);
    return { gastos, ingresos };
  }

  return { gastos: 0, ingresos: 0 };
}
