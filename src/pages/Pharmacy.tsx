
import React from 'react';
import { Pill, ShoppingCart, Clock, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Pharmacy = () => {
  const medications = [
    {
      name: 'Paracetamol 500mg',
      price: 'KSh 120',
      prescription: 'Required',
      availability: 'In Stock'
    },
    {
      name: 'Amoxicillin 250mg',
      price: 'KSh 350',
      prescription: 'Required',
      availability: 'In Stock'
    },
    {
      name: 'Vitamin C Tablets',
      price: 'KSh 80',
      prescription: 'Not Required',
      availability: 'In Stock'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4">
      <div className="container mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto">
            <Pill className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Pharmacy</h1>
          <p className="text-lg text-gray-600">Order medications and health products</p>
        </div>

        {/* Service Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-2 border-pink-200">
            <CardHeader>
              <CardTitle className="text-pink-700">Prescription Orders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">Upload your prescription and we'll prepare your medication</p>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-pink-600" />
                <span className="text-sm">Ready in 30 minutes</span>
              </div>
              <Button className="w-full bg-pink-600 hover:bg-pink-700">
                Upload Prescription
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Over-the-Counter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">Browse and order medications without prescription</p>
              <div className="flex items-center space-x-2">
                <Truck className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Free delivery above KSh 500</span>
              </div>
              <Button variant="outline" className="w-full">
                Browse Products
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Popular Medications */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Medications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {medications.map((med, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                    <Pill className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{med.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant={med.prescription === 'Required' ? 'destructive' : 'secondary'}>
                        {med.prescription === 'Required' ? 'Prescription' : 'OTC'}
                      </Badge>
                      <Badge className="bg-green-100 text-green-800">
                        {med.availability}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg">{med.price}</p>
                  <Button size="sm" className="mt-2">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Cart Summary */}
        <Card className="border-2 border-pink-200 bg-pink-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Your Cart</h3>
                <p className="text-sm text-gray-600">0 items</p>
              </div>
              <Button disabled>
                <ShoppingCart className="h-4 w-4 mr-2" />
                View Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Pharmacy;
