import ContentLayout from '../../components/layout/content.layout';
import TextPanel from '../../components/panel/text.panel';

export default function Info() {
  const intro = 'The data set includes data from a direct marketer who sells his products only via direct mail. He sends catalogs with product characteristics to customers who then order directly from the catalogs. The marketer has developed customer records to learn what makes some customers spend more than others.';
  const dataSetInfo = 'The data set includes n = 1000 customers and the following variables:';
  const variablesInfo = [
    'Age (of customer; old/middle/young);',
    'Gender (male/female);',
    'OwnHome (whether customer owns home; yes/no);',
    'Married (single/married);',
    'Location (far/close; in terms of distance to the nearest brick and mortar store that sells similar products);',
    'Salary (yearly salary of customer; in dollars);',
    'Children (number of children; 0–3);',
    'History (of previous purchase volume; low/medium/high/NA; NA means that this customer has not yet purchased);',
    'Catalogs (number of catalogs sent);',
    'AmountSpent (in dollars)',
  ];
  const outro = 'The objective is to explain AmountSpent in terms of the provided customer characteristics.';

  return (
    <ContentLayout>
      <TextPanel header="Data description">
        <div>{intro}</div>
        <div>{dataSetInfo}</div>
        <ul>
          {variablesInfo.map((item, i) => <li key={`var_info_${i}`}>{item}</li>)}
        </ul>
        <div>{outro}</div>
      </TextPanel>
    </ContentLayout>
  );
}
