
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockReservations, mockVehicles } from '@/data/mockData';
import { Star, Send, MessageSquare } from 'lucide-react';

export const FeedbackPage: React.FC = () => {
  const [selectedReservation, setSelectedReservation] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  // Mock feedback data
  const mockFeedback = [
    {
      id: '1',
      reservationCode: 'REZ20240615-001',
      vehicleBrand: 'Toyota',
      vehicleModel: 'Corolla',
      rating: 5,
      comment: 'Experiență excelentă! Mașina era în stare perfectă.',
      date: '2024-06-15',
      status: 'published'
    },
    {
      id: '2',
      reservationCode: 'REZ20240610-002',
      vehicleBrand: 'Ford',
      vehicleModel: 'Focus',
      rating: 4,
      comment: 'Foarte mulțumit de serviciu, recomand!',
      date: '2024-06-10',
      status: 'published'
    }
  ];

  // Get completed reservations for feedback
  const completedReservations = mockReservations.filter(r => r.status === 'completed');

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feedback submitted:', { selectedReservation, rating, comment });
    // Reset form
    setSelectedReservation('');
    setRating('');
    setComment('');
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Feedback</h1>
        <p className="text-muted-foreground">
          Evaluați experiența dumneavoastră și ajutați-ne să ne îmbunătățim serviciile
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feedback Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Lasă un Feedback
            </CardTitle>
            <CardDescription>
              Evaluează o rezervare finalizată
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitFeedback} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Selectează Rezervarea</label>
                <Select value={selectedReservation} onValueChange={setSelectedReservation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Alege o rezervare finalizată" />
                  </SelectTrigger>
                  <SelectContent>
                    {completedReservations.map(reservation => {
                      const vehicle = mockVehicles.find(v => v.id === reservation.vehicleId);
                      return (
                        <SelectItem key={reservation.id} value={reservation.id}>
                          {reservation.code} - {vehicle?.brand} {vehicle?.model}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Evaluare</label>
                <Select value={rating} onValueChange={setRating}>
                  <SelectTrigger>
                    <SelectValue placeholder="Alege o notă de la 1 la 5" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">⭐⭐⭐⭐⭐ Excelent (5)</SelectItem>
                    <SelectItem value="4">⭐⭐⭐⭐ Foarte bine (4)</SelectItem>
                    <SelectItem value="3">⭐⭐⭐ Bine (3)</SelectItem>
                    <SelectItem value="2">⭐⭐ Satisfăcător (2)</SelectItem>
                    <SelectItem value="1">⭐ Nesatisfăcător (1)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Comentariu</label>
                <Textarea
                  placeholder="Descrieți experiența dumneavoastră cu serviciul nostru..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full" disabled={!selectedReservation || !rating}>
                <Send className="w-4 h-4 mr-2" />
                Trimite Feedback
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Feedback Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Statistici Feedback</CardTitle>
            <CardDescription>
              Rezumatul evaluărilor dumneavoastră
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold">4.8</div>
                <p className="text-sm text-muted-foreground">Rating Mediu</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold">{mockFeedback.length}</div>
                <p className="text-sm text-muted-foreground">Total Feedback-uri</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Distribuția Rating-urilor</h4>
              {[5, 4, 3, 2, 1].map(stars => (
                <div key={stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-20">
                    <span className="text-sm">{stars}</span>
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full" 
                      style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : 10}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {stars === 5 ? '70%' : stars === 4 ? '20%' : '10%'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Previous Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Feedback-urile Mele</CardTitle>
          <CardDescription>
            Istoricul evaluărilor pe care le-ați oferit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rezervare</TableHead>
                  <TableHead>Vehicul</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Comentariu</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockFeedback.map(feedback => (
                  <TableRow key={feedback.id}>
                    <TableCell className="font-medium">{feedback.reservationCode}</TableCell>
                    <TableCell>{feedback.vehicleBrand} {feedback.vehicleModel}</TableCell>
                    <TableCell>{renderStars(feedback.rating)}</TableCell>
                    <TableCell className="max-w-xs truncate">{feedback.comment}</TableCell>
                    <TableCell>{feedback.date}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {feedback.status === 'published' ? 'Publicat' : 'În așteptare'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {mockFeedback.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Nu aveți feedback-uri încă.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
