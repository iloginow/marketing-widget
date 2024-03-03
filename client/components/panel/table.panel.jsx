'use client';

import { Panel } from 'rsuite';
import {
  Table, Thead, Tbody, Tr, Th, Td,
} from 'react-super-responsive-table';

import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

export default function TablePanel({ header, dataset }) {
  return (
    <Panel header={header} className="table-panel">
      <Table>
        <Thead>
          <Tr>
            <Th>Age</Th>
            <Th>Gender</Th>
            <Th>Home</Th>
            <Th>Married</Th>
            <Th>Location</Th>
            <Th>Salary</Th>
            <Th>Children</Th>
            <Th>History</Th>
            <Th>Spent</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dataset.map((item, i) => (
            <Tr key={`row_${i}`}>
              <Td>{item.age}</Td>
              <Td>{item.gender}</Td>
              <Td>{item.home}</Td>
              <Td>{item.married}</Td>
              <Td>{item.location}</Td>
              <Td>{item.salary}</Td>
              <Td>{item.children}</Td>
              <Td>{item.history}</Td>
              <Td>{item.avgSpent}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Panel>
  );
}
