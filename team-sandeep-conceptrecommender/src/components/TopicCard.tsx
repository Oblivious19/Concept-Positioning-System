//author: Nabarupa, Banik
import React, { useState } from 'react';
import { Topic } from '../types';
import { 
  CheckCircle, 
  Clock, 
  Play, 
  BookOpen, 
  Award,
  Target,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Video,
  FileText,
  Code,
  Lightbulb
} from 'lucide-react';

interface TopicCardProps {
  topic: Topic;
  onStartTopic?: (topicId: string) => void;
  onTakeExam?: (topicId: string) => void;
}

export const TopicCard: React.FC<TopicCardProps> = ({ 
  topic, 
  onStartTopic, 
  onTakeExam 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = () => {
    switch (topic.status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Play className="w-5 h-5 text-blue-500" />;
      case 'mastered':
        return <Award className="w-5 h-5 text-purple-500" />;
      default:
        return <BookOpen className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = () => {
    switch (topic.status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'mastered': return 'Mastered';
      default: return 'Not Started';
    }
  };

  const getTutorialContent = (topicName: string) => {
    const tutorials = {
      'Arrays & Strings': [
        { type: 'video', title: 'Introduction to Arrays', duration: '15:30' },
        { type: 'article', title: 'String Manipulation Basics', duration: '10 min read' },
        { type: 'code', title: 'Two Pointers Technique', duration: '20 min practice' }
      ],
      'Linked Lists': [
        { type: 'video', title: 'Singly Linked Lists', duration: '20:15' },
        { type: 'article', title: 'Doubly Linked Lists', duration: '15 min read' },
        { type: 'code', title: 'Cycle Detection', duration: '25 min practice' }
      ],
      'Binary Trees': [
        { type: 'video', title: 'Tree Traversals', duration: '18:45' },
        { type: 'article', title: 'Binary Search Trees', duration: '12 min read' },
        { type: 'code', title: 'Tree Manipulation', duration: '30 min practice' }
      ],
      'Dynamic Programming': [
        { type: 'video', title: 'Memoization vs Tabulation', duration: '25:20' },
        { type: 'article', title: 'DP Patterns', duration: '20 min read' },
        { type: 'code', title: 'State Transitions', duration: '35 min practice' }
      ],
      'Hash Tables': [
        { type: 'video', title: 'Hash Functions', duration: '12:30' },
        { type: 'article', title: 'Collision Resolution', duration: '8 min read' },
        { type: 'code', title: 'Hash Table Implementation', duration: '25 min practice' }
      ],
      'Graph Algorithms': [
        { type: 'video', title: 'Graph Representations', duration: '22:15' },
        { type: 'article', title: 'BFS and DFS', duration: '15 min read' },
        { type: 'code', title: 'Shortest Path Algorithms', duration: '40 min practice' }
      ]
    };

    return tutorials[topicName as keyof typeof tutorials] || [];
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <h3 className="text-lg font-bold text-gray-900">{topic.name}</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(topic.difficulty)}`}>
          {topic.difficulty}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{topic.description}</p>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium">{topic.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${topic.progress}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Target className="w-4 h-4" />
            <span>{topic.problemsSolved}/{topic.totalProblems} problems</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{topic.estimatedTime}</span>
          </div>
        </div>

        {topic.examScore && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Last exam score</span>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="font-medium text-green-600">{topic.examScore}%</span>
            </div>
          </div>
        )}
      </div>

      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-sm text-gray-600 hover:text-blue-600 transition-colors mb-4"
      >
        <span className="flex items-center space-x-2">
          <Lightbulb className="w-4 h-4" />
          <span>View Tutorial Content</span>
        </span>
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {isExpanded && (
        <div className="space-y-3 mb-4 border-t border-gray-100 pt-4">
          {getTutorialContent(topic.name).map((tutorial, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {tutorial.type === 'video' && <Video className="w-4 h-4 text-red-500" />}
                {tutorial.type === 'article' && <FileText className="w-4 h-4 text-blue-500" />}
                {tutorial.type === 'code' && <Code className="w-4 h-4 text-green-500" />}
                <span className="text-sm text-gray-700">{tutorial.title}</span>
              </div>
              <span className="text-xs text-gray-500">{tutorial.duration}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex space-x-2">
        {topic.status === 'not-started' && (
          <button 
            onClick={() => onStartTopic?.(topic.id)}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Play className="w-4 h-4" />
            <span>Start Learning</span>
          </button>
        )}
        
        {(topic.status === 'in-progress' || topic.status === 'completed') && (
          <>
            <button 
              onClick={() => onStartTopic?.(topic.id)}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Continue
            </button>
            <button 
              onClick={() => onTakeExam?.(topic.id)}
              className="flex-1 border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Take Exam
            </button>
          </>
        )}
      </div>

      {topic.status === 'completed' && (
        <div className="mt-3 text-center">
          <span className="text-sm text-green-600 font-medium">{getStatusText()}</span>
        </div>
      )}
    </div>
  );
};