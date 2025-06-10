
import React, { useState } from 'react';
import { Vehicle } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface EditVehicleFormProps {
  vehicle: Vehicle;
  onSave: (vehicle: Vehicle) => void;
  onCancel: () => void;
}

export const EditVehicleForm: React.FC<EditVehicleFormProps> = ({
  vehicle,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    brand: vehicle.brand,
    model: vehicle.model,
    year: vehicle.year,
    licensePlate: vehicle.licensePlate,
    color: vehicle.color,
    fuelType: vehicle.fuelType,
    transmission: vehicle.transmission,
    seats: vehicle.seats,
    dailyRate: vehicle.dailyRate,
    status: vehicle.status,
    mileage: vehicle.mileage,
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedVehicle: Vehicle = {
      ...vehicle,
      ...formData,
      year: Number(formData.year),
      seats: Number(formData.seats),
      dailyRate: Number(formData.dailyRate),
      mileage: Number(formData.mileage),
    };

    onSave(updatedVehicle);
    toast.success(`Vehiculul ${vehicle.code} a fost actualizat cu succes!`);
  };

  return (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Editare Vehicul - {vehicle.code}</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="brand">Marcă</Label>
            <Input
              id="brand"
              value={formData.brand}
              onChange={(e) => handleInputChange('brand', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              value={formData.model}
              onChange={(e) => handleInputChange('model', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="year">An fabricație</Label>
            <Input
              id="year"
              type="number"
              min="1990"
              max="2030"
              value={formData.year}
              onChange={(e) => handleInputChange('year', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="licensePlate">Număr înmatriculare</Label>
            <Input
              id="licensePlate"
              value={formData.licensePlate}
              onChange={(e) => handleInputChange('licensePlate', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">Culoare</Label>
            <Input
              id="color"
              value={formData.color}
              onChange={(e) => handleInputChange('color', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fuelType">Tip combustibil</Label>
            <Select value={formData.fuelType} onValueChange={(value) => handleInputChange('fuelType', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Benzină">Benzină</SelectItem>
                <SelectItem value="Diesel">Diesel</SelectItem>
                <SelectItem value="Hibrid">Hibrid</SelectItem>
                <SelectItem value="Electric">Electric</SelectItem>
                <SelectItem value="GPL">GPL</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="transmission">Transmisie</Label>
            <Select value={formData.transmission} onValueChange={(value) => handleInputChange('transmission', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Manuală">Manuală</SelectItem>
                <SelectItem value="Automată">Automată</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seats">Număr locuri</Label>
            <Input
              id="seats"
              type="number"
              min="2"
              max="9"
              value={formData.seats}
              onChange={(e) => handleInputChange('seats', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dailyRate">Tarif zilnic (RON)</Label>
            <Input
              id="dailyRate"
              type="number"
              min="0"
              step="0.01"
              value={formData.dailyRate}
              onChange={(e) => handleInputChange('dailyRate', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mileage">Kilometraj</Label>
            <Input
              id="mileage"
              type="number"
              min="0"
              value={formData.mileage}
              onChange={(e) => handleInputChange('mileage', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Disponibil</SelectItem>
                <SelectItem value="rented">Închiriat</SelectItem>
                <SelectItem value="maintenance">Service</SelectItem>
                <SelectItem value="inactive">Inactiv</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="flex gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Anulează
          </Button>
          <Button type="submit">
            Salvează modificările
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
