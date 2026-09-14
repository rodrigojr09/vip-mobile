import EventoData from "./EventoData";
import LevantamentoData from "./LevanamentoData";
import PsicoData from "./PsicoData";
import VisitaData from "./VisitaData";

export default {
    visitas: VisitaData.getInstance(),
    levantamentos: LevantamentoData.getInstance(),
    eventos: EventoData.getInstance(),
    psicos: PsicoData.getInstance(),
}