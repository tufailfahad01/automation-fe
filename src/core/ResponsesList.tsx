'use client';
import React, { useState, useEffect } from "react";
import Card from "../common/Card";
import Button from "../common/Button";
import Loader from "../common/Loader";
import { getResponses } from "../utils/api";
import { formatDate, truncateText, formatResponse} from "@/utils/helper.functions";


interface ResponseItem {
  id: string;
  prompt: string;
  response: string;
  created_at: string;
}

const ResponsesList: React.FC = () => {
  const [responses, setResponses] = useState<ResponseItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [expandedPrompts, setExpandedPrompts] = useState<Set<string>>(new Set());
  const [expandedResponses, setExpandedResponses] = useState<Set<string>>(new Set());

  const fetchResponses = async (
    currentOffset: number = 0,
    reset: boolean = false
  ) => {
    setLoading(true);
    setError(null);

    try {
      const result = await getResponses(limit, currentOffset);
      const newResponses = result.data || [];

      if (reset) {
        setResponses(newResponses);
      } else {
        setResponses((prev) => [...prev, ...newResponses]);
      }

      setHasMore(newResponses.length === limit);
    } catch (err: any) {
      setError(err.message || "Failed to fetch responses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResponses(0, true);
  }, []);

  const loadMore = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    fetchResponses(newOffset, false);
  };

  const toggleExpandedPrompt = (id: string) => {
    const newExpanded = new Set(expandedPrompts);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedPrompts(newExpanded);
  };

  const toggleExpandedResponse = (id: string) => {
    const newExpanded = new Set(expandedResponses);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedResponses(newExpanded);
  };

  const refresh = () => {
    setOffset(0);
    setExpandedPrompts(new Set());
    setExpandedResponses(new Set());
    fetchResponses(0, true);
  };

  return (
    <div className="relative ">
      <div
        className={
          loading && responses.length === 0
            ? "pointer-events-none blur-sm opacity-60 transition-all duration-300"
            : "transition-all duration-300"
        }
      >
        <Card className="mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-extrabold text-gray-100 font-outfit tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Stored Responses
            </h2>
            <Button onClick={refresh} disabled={loading}>
              Refresh
            </Button>
          </div>

          {error && (
            <div className="mb-8 text-red-300 text-center font-medium bg-red-900/30 border border-red-500/30 rounded-2xl py-4 px-6 backdrop-blur-sm">
              {error}
            </div>
          )}

          {responses.length === 0 && !loading && !error && (
            <div className="text-center text-gray-400 py-12">
              <div className="mb-4">
                <svg className="mx-auto h-16 w-16 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-xl font-semibold">No responses found.</p>
              <p className="text-base mt-2 text-gray-500">
                Submit some prompts to see them here.
              </p>
            </div>
          )}

          <div className="space-y-8">
            {responses.map((item) => {
              const isPromptExpanded = expandedPrompts.has(item.id);
              const isResponseExpanded = expandedResponses.has(item.id);
              return (
                <div
                  key={item.id}
                  className="glass-light rounded-3xl p-8 border border-gray-600/30 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-bold text-gray-200 font-outfit bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Prompt
                    </h3>
                    <span className="text-sm text-gray-400 bg-gray-800/50 px-4 py-2 rounded-full border border-gray-600/30 backdrop-blur-sm">
                      {formatDate(item.created_at)}
                    </span>
                  </div>

                  <div className="mb-6">
                    <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/30 backdrop-blur-sm">
                      <p className="text-gray-200 whitespace-pre-wrap font-outfit leading-relaxed">
                        {isPromptExpanded
                          ? item.prompt
                          : truncateText(item.prompt, 150)}
                      </p>
                      {item.prompt.length > 150 && (
                        <button
                          onClick={() => toggleExpandedPrompt(item.id)}
                          className="text-blue-400 hover:text-blue-300 text-sm font-medium mt-3 transition-colors duration-200 hover:underline"
                        >
                          {isPromptExpanded ? "Show less" : "Show more"}
                        </button>
                      )}
                    </div>
                  </div>

                  <h4 className="text-xl font-bold text-gray-200 mb-4 font-outfit bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    AI Response
                  </h4>

                  <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl p-6 border border-blue-500/20 backdrop-blur-sm">
                    <p className="text-gray-200 whitespace-pre-wrap font-outfit leading-relaxed">
                      {isResponseExpanded
                        ? formatResponse(item.response)
                        : truncateText(formatResponse(item.response), 300)}
                    </p>
                    {item.response.length > 300 && (
                      <button
                        onClick={() => toggleExpandedResponse(item.id)}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium mt-3 transition-colors duration-200 hover:underline"
                      >
                        {isResponseExpanded ? "Show less" : "Show more"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {hasMore && responses.length > 0 && (
            <div className="text-center mt-10">
              <Button onClick={loadMore} disabled={loading}>
                {loading ? "Loading..." : "Load More"}
              </Button>
            </div>
          )}
        </Card>
      </div>

      {loading && responses.length === 0 && (
        <Loader text="Loading responses..." />
      )}
    </div>
  );
};

export default ResponsesList;
