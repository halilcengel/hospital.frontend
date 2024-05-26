import SvgColor from './src/components/SvgColor';
// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Hastalıklarım',
    path: '/dashboard/patient',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Randevu Al',
    path: '/dashboard/patient/randevu',
    icon: icon('ic_user'),
  },
];

export default navConfig;
