"use client";

const ShareButton = () => {
  const handleShare = async () => {
    try {
      await navigator.share({
        url: "https://auto-delete-todo-list.vercel.app/seo",
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <div>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://auto-delete-todo-list.vercel.app/seo")}`}
        target="_blank"
      >
        Share
      </a>

      <button style={{ padding: "24px" }} onClick={handleShare}>
        Share button
      </button>
    </div>
  );
};

export default ShareButton;
