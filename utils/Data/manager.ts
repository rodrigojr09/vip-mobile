import EventoData from "./EventoData";
import LevantamentoData from "./LevanamentoData";
import VisitaData from "./VisitaData";

export default {
    visitas: VisitaData.getInstance(),
    levantamentos: LevantamentoData.getInstance(),
    eventos: EventoData.getInstance(),
}