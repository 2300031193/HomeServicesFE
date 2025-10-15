import React, { useState } from 'react';
import { FiTrash2, FiPlus } from 'react-icons/fi';

const ServiceList = ({ services, setServices }) => {
  const [newService, setNewService] = useState({ title: '', price: '' });

  const addService = () => {
    if (newService.title && newService.price) {
      const updatedServices = [...services, { ...newService, id: Date.now() }];
      setServices(updatedServices);
      setNewService({ title: '', price: '' });
    }
  };

  const deleteService = (id) => {
    const updatedServices = services.filter(service => service.id !== id);
    setServices(updatedServices);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mt-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Service Management</h3>
      
      {/* Add Service Form */}
      <div className="flex items-center space-x-4 mb-6">
        <input
          type="text"
          placeholder="Service Title"
          value={newService.title}
          onChange={(e) => setNewService({ ...newService, title: e.target.value })}
          className="border-gray-300 focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border rounded-md p-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={newService.price}
          onChange={(e) => setNewService({ ...newService, price: e.target.value })}
          className="border-gray-300 focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border rounded-md p-2"
        />
        <button onClick={addService} className="bg-teal-500 text-white p-2 rounded-md hover:bg-teal-600">
          <FiPlus size={24} />
        </button>
      </div>

      {/* Service List */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {services.map((service) => (
              <tr key={service.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${service.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => deleteService(service.id)} className="text-red-600 hover:text-red-900">
                    <FiTrash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceList;