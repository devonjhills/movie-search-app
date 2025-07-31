"use client";

import { useState, useEffect } from "react";
import {
  ShareIcon,
  CheckIcon,
  XMarkIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
  url?: string;
  title?: string;
  text?: string;
  className?: string;
  variant?: "default" | "hero";
}

interface ShareOption {
  name: string;
  icon: React.ReactNode;
  action: () => void;
  color?: string;
}

export function ShareButton({
  url,
  title = "Check this out!",
  text = "Check this out!",
  className,
  variant = "default",
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl =
    url || (typeof window !== "undefined" ? window.location.href : "");

  // Close modal when pressing Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setIsOpen(false);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      // Fallback for older browsers
      try {
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);

        setCopied(true);
        setIsOpen(false);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      } catch {
        console.error("Copy failed");
      }
    }
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, "_blank");
    setIsOpen(false);
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, "_blank");
    setIsOpen(false);
  };

  const shareToReddit = () => {
    const redditUrl = `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`;
    window.open(redditUrl, "_blank");
    setIsOpen(false);
  };

  const shareToLinkedIn = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedinUrl, "_blank");
    setIsOpen(false);
  };

  const shareToWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${text} ${shareUrl}`)}`;
    window.open(whatsappUrl, "_blank");
    setIsOpen(false);
  };

  const nativeShare = async () => {
    if (navigator.share && typeof navigator.share === "function") {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        });
        setIsOpen(false);
      } catch {
        // Native share cancelled
      }
    }
  };

  const shareOptions: ShareOption[] = [
    {
      name: "Copy Link",
      icon: <ClipboardDocumentIcon className="h-4 w-4" />,
      action: copyToClipboard,
    },
    {
      name: "Twitter / X",
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
        </svg>
      ),
      action: shareToTwitter,
      color: "hover:text-blue-400",
    },
    {
      name: "Facebook",
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      action: shareToFacebook,
      color: "hover:text-blue-600",
    },
    {
      name: "Reddit",
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
        </svg>
      ),
      action: shareToReddit,
      color: "hover:text-orange-500",
    },
    {
      name: "LinkedIn",
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      action: shareToLinkedIn,
      color: "hover:text-blue-700",
    },
    {
      name: "WhatsApp",
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
        </svg>
      ),
      action: shareToWhatsApp,
      color: "hover:text-green-500",
    },
  ];

  // Add native share option if supported
  if (
    typeof window !== "undefined" &&
    navigator.share &&
    typeof navigator.share === "function"
  ) {
    shareOptions.unshift({
      name: "Share...",
      icon: <ShareIcon className="h-4 w-4" />,
      action: nativeShare,
    });
  }

  const baseClasses =
    "relative inline-flex items-center rounded-lg transition-colors focus:outline-none focus:ring-2";

  const variantClasses = {
    default:
      "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary/50",
    hero: "border border-foreground/30 text-foreground bg-background/20 backdrop-blur-sm hover:bg-background/40 focus:ring-primary/50",
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(baseClasses, variantClasses[variant], className)}
        title={copied ? "URL Copied!" : "Share this page"}
      >
        <div className="flex items-center space-x-2 px-6 py-3">
          {copied ? (
            <CheckIcon className="h-5 w-5 text-green-400" />
          ) : (
            <ShareIcon className="h-5 w-5" />
          )}
          <span>{copied ? "Copied!" : "Share"}</span>
        </div>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div
            className={cn(
              "relative bg-background border border-border rounded-lg shadow-xl",
              "w-full max-w-sm mx-4 p-6",
              "animate-in fade-in-0 zoom-in-95 duration-200",
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Share</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Share Options */}
            <div className="space-y-2">
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={option.action}
                  className={cn(
                    "w-full px-4 py-3 text-left rounded-lg",
                    "flex items-center space-x-3",
                    "hover:bg-muted transition-colors",
                    "text-foreground border border-border/50",
                    option.color,
                  )}
                >
                  <span className="flex-shrink-0">{option.icon}</span>
                  <span className="font-medium">{option.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
