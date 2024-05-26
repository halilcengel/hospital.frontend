import SvgColor from "./src/components/SvgColor";
// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const drNavConfig = [
  {
    title: "Randevularım",
    path: "/dashboard/doctor",
    icon: icon("ic_analytics"),
  },
  {
    title: "Hastalıklar",
    path: "/dashboard/doctor/diagnostics",
    icon: icon("ic_disabled"),
  },
];

export default drNavConfig;

