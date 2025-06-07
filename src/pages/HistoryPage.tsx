
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { History, Car } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HistoryPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Istoricul Rezervărilor</h1>
        <p className="text-muted-foreground">
          Vizualizați istoricul complet al rezervărilor dumneavoastră
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">0</div>
            <p className="text-sm text-muted-foreground">Rezervări Finalizate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">0 RON</div>
            <p className="text-sm text-muted-foreground">Total Cheltuit</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">0 RON</div>
            <p className="text-sm text-muted-foreground">Media per Rezervare</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">N/A</div>
            <p className="text-sm text-muted-foreground">Rating Mediu</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Istoricul Complet</CardTitle>
          <CardDescription>
            Toate rezervările finalizate cu detalii complete
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <History className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nu aveți istoric de rezervări</h3>
            <p className="text-muted-foreground mb-4">
              Odată ce finalizați o rezervare, aceasta va apărea aici în istoric.
            </p>
            <Link to="/vehicles">
              <Button>
                <Car className="w-4 h-4 mr-2" />
                Faceți Prima Rezervare
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
