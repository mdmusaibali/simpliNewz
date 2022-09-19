import Moment from "moment";

export const formatDate = (datex) => {
  Moment.locale("en");
  const date = Moment(datex).format("DD-MM-YYYY");
  const time = Moment(datex).format("hh:MM A");
  return { date, time };
};
