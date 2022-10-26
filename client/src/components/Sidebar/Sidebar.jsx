import React, { useState, useEffect } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import axios from 'axios';

import './sidebar.css';

export default function SidebarFilters() {
  const filterOptionLabels = [
    { slug: 'end_year', title: 'Year' },
    { slug: 'topic', title: 'Topic' },
    { slug: 'sector', title: 'Sector' },
    { slug: 'region', title: 'Region' },
    { slug: 'pestle', title: 'PESTLE' },
    { slug: 'source', title: 'Source' },
    { country: 'country', title: 'Country' },
  ];
  const [filterOptions, setFilterOptions] = useState(null);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/filterOptions`
        );
        setFilterOptions(response.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <ProSidebar>
      <Menu>
        <MenuItem>Filter</MenuItem>
        {filterOptionLabels.map((option, id) => (
          <SubMenu title={option.title} key={id}>
            {filterOptions &&
              filterOptions[option.slug] &&
              filterOptions[option.slug].map((item, id) => {
                if (id !== 0) return <MenuItem key={id}>{item}</MenuItem>;
              })}
          </SubMenu>
        ))}
      </Menu>
    </ProSidebar>
  );
}
