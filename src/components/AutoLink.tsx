const AutoLink = (props: { text: string; [key: string]: any }) => {
  const { text } = props;
  if (!text) return null;

  // Function to parse HTML string and convert to React elements
  const parseText = (htmlString: string) => {
    // Regular expression to match <a> tags and their contents
    const linkRegex = /<a\s+(?:[^>]*?)href="([^"]*)"(?:[^>]*?)>(.*?)<\/a>/g;

    // Split the text by <a> tags
    const parts = htmlString.split(linkRegex);

    // Build the result array
    const result = [];
    for (let i = 0; i < parts.length; i++) {
      if (i % 3 === 0) {
        // Regular text
        result.push(parts[i]);
      } else if (i % 3 === 2) {
        // Link text with href from previous group
        const href = parts[i - 1];
        const linkText = parts[i];
        result.push(
          <a
            key={i}
            href={href}
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkText}
          </a>
        );
      }
      // Skip href values (i % 3 === 1)
    }

    return result;
  };

  return <span>{parseText(text)}</span>;
};

export default AutoLink;
