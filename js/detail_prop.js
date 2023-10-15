import apiDetalleCall from "./propiedad/apiDetalle.js";
import { PropertyData } from "./Data/userId.js";

const url = window.location.search; 
const value = url.match(/\d+/)[0];

const {companyId, realtorId} = PropertyData;

apiDetalleCall(value, realtorId, 1, companyId); 