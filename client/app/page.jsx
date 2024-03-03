import ChartPanel from '../components/panel/chart.panel';
import TablePanel from '../components/panel/table.panel';
import ContentLayout from '../components/layout/content.layout';

async function getData() {
  const apiHost = process.env.API_HOST || 'http://localhost:8080';
  const res = await fetch(`${apiHost}/overview`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Data() {
  const data = await getData();

  return (
    <ContentLayout>
      <ChartPanel
        header="Amount spent by age"
        dataset={data.age}
      />
      <ChartPanel
        header="Amount spent by gender"
        dataset={data.gender}
      />
      <ChartPanel
        header="Amount spent by home ownership"
        dataset={data.home}
      />
      <ChartPanel
        header="Amount spent by home family status"
        dataset={data.married}
        extraMargin={60}
      />
      <ChartPanel
        header="Amount spent by location of the nearest store"
        dataset={data.location}
      />
      <ChartPanel
        header="Amount spent by number of children"
        dataset={data.children}
      />
      <ChartPanel
        header="Amount spent by previous purchase volume"
        dataset={data.history}
        extraMargin={60}
      />
      <ChartPanel
        header="Amount spent by annual income"
        dataset={data.salary}
        extraMargin={90}
      />
      <TablePanel
        header="Best buyer categories"
        dataset={data.categories}
      />
    </ContentLayout>
  );
}
