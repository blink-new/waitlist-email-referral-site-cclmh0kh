/**
 * Utility for sharing content to various social platforms
 */
export class Share {
  /**
   * Share on Twitter
   * @param url URL to share
   * @param text Text to include in tweet
   */
  static twitter(url: string, text: string): void {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  }

  /**
   * Share on Facebook
   * @param url URL to share
   */
  static facebook(url: string): void {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'noopener,noreferrer');
  }

  /**
   * Share via LinkedIn
   * @param url URL to share
   * @param title Title of content
   */
  static linkedin(url: string, title: string): void {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    window.open(linkedinUrl, '_blank', 'noopener,noreferrer');
  }

  /**
   * Share via Email
   * @param subject Email subject
   * @param body Email body
   */
  static email(subject: string, body: string): void {
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  }

  /**
   * Copy text to clipboard
   * @param text Text to copy
   * @returns Promise indicating success
   */
  static async copyToClipboard(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Failed to copy text: ', err);
      return false;
    }
  }

  /**
   * Share using the Web Share API (mobile-friendly)
   * Falls back to copying to clipboard if Web Share API is not available
   * @param title Title to share
   * @param text Text to share
   * @param url URL to share
   * @returns Promise indicating success
   */
  static async webShare(title: string, text: string, url: string): Promise<boolean> {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        return true;
      } catch (err) {
        console.error('Error sharing: ', err);
        return false;
      }
    } else {
      // Fallback to copying the URL
      return this.copyToClipboard(url);
    }
  }
}