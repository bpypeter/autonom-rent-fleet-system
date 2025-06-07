
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Star, Send, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

export const FeedbackPage: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Vă rugăm să selectați o notă');
      return;
    }
    
    toast.success('Feedback-ul a fost trimis cu succes!');
    setRating(0);
    setComment('');
  };

  const renderStars = (currentRating: number, interactive = false) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`w-6 h-6 ${interactive ? 'cursor-pointer' : ''} ${
              star <= currentRating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'
            }`}
            onClick={interactive ? () => setRating(star) : undefined}
            onMouseEnter={interactive ? () => setHoveredRating(star) : undefined}
            onMouseLeave={interactive ? () => setHoveredRating(0) : undefined}
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
              Momentan nu aveți rezervări finalizate pentru care să puteți lăsa feedback
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitFeedback} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Evaluare Generală a Serviciului</label>
                <div className="flex items-center gap-2">
                  {renderStars(hoveredRating || rating, true)}
                  {rating > 0 && (
                    <span className="text-sm text-muted-foreground ml-2">
                      ({rating}/5)
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Comentariu (opțional)</label>
                <Textarea
                  placeholder="Descrieți experiența dumneavoastră cu serviciul nostru..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full" disabled={rating === 0}>
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
            <div className="text-center py-8">
              <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nu aveți feedback-uri încă</h3>
              <p className="text-muted-foreground">
                După finalizarea unei rezervări, veți putea lăsa feedback despre experiența dumneavoastră.
              </p>
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
          <div className="text-center py-8">
            <p className="text-muted-foreground">Nu aveți feedback-uri înregistrate.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
