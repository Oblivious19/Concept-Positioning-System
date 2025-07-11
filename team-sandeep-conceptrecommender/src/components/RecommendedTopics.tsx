//author: Pentapati V V Satya Pavan, Sandeep
import React from 'react';
import { Topic, AIRecommendation } from '../types';
import { TopicCard } from './TopicCard';
import { Brain, Sparkles, TrendingUp } from 'lucide-react';

interface RecommendedTopicsProps {
  topics: Topic[];
  recommendations: AIRecommendation[];
  onStartTopic: (topicId: string) => void;
}

export const RecommendedTopics: React.FC<RecommendedTopicsProps> = ({ 
  topics, 
  recommendations, 
  onStartTopic 
}) => {
  const recommendedTopics = topics.filter(topic => 
    recommendations.some(rec => rec.topicId === topic.id)
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">AI Recommendations</h3>
          <p className="text-sm text-gray-600">Personalized learning path based on your progress</p>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => {
          const topic = topics.find(t => t.id === rec.topicId);
          if (!topic) return null;

          return (
            <div key={rec.topicId} className="border border-purple-100 rounded-lg p-4 bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-purple-600">#{index + 1}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-900">{topic.name}</h4>
                    <div className="flex items-center space-x-1">
                      <Sparkles className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-medium text-purple-600">
                        {rec.confidence}% match
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{rec.reason}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-gray-600">
                          Difficulty: {rec.estimatedDifficulty}/10
                        </span>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        rec.prereqsMet 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {rec.prereqsMet ? 'Prerequisites met' : 'Some prerequisites missing'}
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => onStartTopic(topic.id)}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                    >
                      Start Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {recommendations.length === 0 && (
        <div className="text-center py-8">
          <Brain className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">AI is analyzing your progress to generate recommendations...</p>
        </div>
      )}
    </div>
  );
};