'use client';

import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Loader2, ChevronRight, ChevronLeft, PanelLeft, Search } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const employeeSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  phone_number: z.string(),
  position: z.string(),
  active: z.boolean(),
});

type Employee = z.infer<typeof employeeSchema>;

const EmployeeOverviewPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filters, setFilters] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
  });
  const [searchFilters, setSearchFilters] = useState(filters);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        // temelj za API poziv, do veceras umesto njega samo koristiti mockData.ts 10:13 24.02.2025

        // const res = await fetch('/employee');
        // const data = await res.json();
        // const parsedData = z.array(employeeSchema).parse(data);
        // setEmployees(parsedData);

        const parsedData = z.array(employeeSchema).parse(mockEmployees);

        setEmployees(parsedData);
      } catch (error) {
        setError('Failed to fetch employees');
        console.error('Failed to fetch employees', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    setSearchFilters(filters);
    setCurrentPage(1);
  };

  const filteredEmployees = employees.filter((employee) => {
    return (
      employee.first_name.toLowerCase().includes(searchFilters.first_name.toLowerCase()) &&
      employee.last_name.toLowerCase().includes(searchFilters.last_name.toLowerCase()) &&
      employee.email.toLowerCase().includes(searchFilters.email.toLowerCase()) &&
      employee.position.toLowerCase().includes(searchFilters.position.toLowerCase())
    );
  });

  // Calculate paginated data
  const indexOfLastEmployee = currentPage * rowsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - rowsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Calculate total pages
  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Employees', href: '/employee' },
  ];

  const renderPagination = () => {
    const pages = [];
    const totalPages = Math.ceil(employees.length / rowsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-2 py-1 ${i === currentPage ? 'font-bold' : ''}`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="p-8">
      <Breadcrumb>
        <BreadcrumbList>
          <PanelLeft className="w-4 h-4" />
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={item.href}
                  className={item.label === 'Employees' ? 'font-bold text-black' : ''}
                >
                  {item.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="max-w-[900px] mx-auto">
        <CardHeader>
          <h1 className="text-2xl font-bold">Employees Overview</h1>
          <p className="text-sm text-gray-600">
            This table provides a clear and organized overview of key employee details for quick reference and easy access.
          </p>
          <div className="flex mt-4 space-x-2">
            <input
              type="text"
              name="first_name"
              placeholder="Filter by First Name"
              value={filters.first_name}
              onChange={handleFilterChange}
              className="border p-2 bg-white w-1/4 rounded-md"
            />
            <input
              type="text"
              name="last_name"
              placeholder="Filter by Last Name"
              value={filters.last_name}
              onChange={handleFilterChange}
              className="border p-2 bg-white w-1/4 rounded-md"
            />
            <input
              type="text"
              name="email"
              placeholder="Filter by Email"
              value={filters.email}
              onChange={handleFilterChange}
              className="border p-2 bg-white w-1/4 rounded-md"
            />
            <input
              type="text"
              name="position"
              placeholder="Filter by Position"
              value={filters.position}
              onChange={handleFilterChange}
              className="border p-2 bg-white w-1/4 rounded-md"
            />
            <button
              onClick={handleSearch}
              className="flex items-center justify-center border border-black text-white bg-black p-2 rounded-md"
            >
              <Search className="w-4 h-4 mr-1" />
              Search
            </button>
          </div>
        </CardHeader>
        <CardContent className="rounded-lg overflow-hidden">
          {loading ? (
            <div className="flex justify-center p-4">
              <Loader2 className="animate-spin w-6 h-6" />
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Active</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>{employee.first_name}</TableCell>
                      <TableCell>{employee.last_name}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>{employee.phone_number}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{employee.active ? 'Yes' : 'No'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="flex items-center justify-between w-[84px] h-[40px] min-w-[80px] p-2 px-3 gap-1 bg-gray-300 text-black rounded-md disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <div className="flex items-center">
                  {renderPagination()}
                </div>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-between w-[84px] h-[40px] min-w-[80px] p-2 px-3 gap-1 bg-black text-white rounded-md disabled:opacity-50"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeOverviewPage;

export const mockEmployees = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone_number: '123-456-7890',
    position: 'Software Engineer',
    active: true,
  },
  {
    id: 2,
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane.smith@example.com',
    phone_number: '987-654-3210',
    position: 'Product Manager',
    active: false,
  },
  {
    id: 3,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone_number: '123-456-7890',
    position: 'Software Engineer',
    active: true,
  },
  {
    id: 4,
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane.smith@example.com',
    phone_number: '987-654-3210',
    position: 'Product Manager',
    active: false,
  },
  {
    id: 5,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone_number: '123-456-7890',
    position: 'Software Engineer',
    active: true,
  },
  {
    id: 6,
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane.smith@example.com',
    phone_number: '987-654-3210',
    position: 'Product Manager',
    active: false,
  },
];
