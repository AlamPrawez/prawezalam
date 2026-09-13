const MAX_RECENT_ITEMS = 4;
const STORAGE_KEY = 'recent_blogs';

/**
 * Updates localStorage with incoming blog data until the array reaches 4 items.
 * Ignores items that are already saved (by ID).
 * 
 * @param incomingData Array of blog objects fetched from the API
 */
export function syncRecentBlogsToStorage(incomingData: any[]) {
  // 0. Ensure environment is browser-side
  if (typeof window === 'undefined') return;

  // 1. Guard against non-array response
  if (!Array.isArray(incomingData) || incomingData.length === 0) {
    return;
  }

  try {
    // 2. Read existing items from localStorage safely
    const storedRaw = localStorage.getItem(STORAGE_KEY);
    const existingBlogs: any[] = storedRaw ? JSON.parse(storedRaw) : [];

    // 3. Stop immediately if we already reached the 4-item limit
    if (existingBlogs.length >= MAX_RECENT_ITEMS) {
      return;
    }

    // 4. Calculate how many new items are required
    const slotsNeeded = MAX_RECENT_ITEMS - existingBlogs.length;

    // 5. Filter out duplicate items already in storage
    const newUniqueItems = incomingData
      .filter((incomingItem) => !existingBlogs.some((stored) => stored.id === incomingItem.id))
      .slice(0, slotsNeeded);

    // 6. Merge and update localStorage if we have new items to add
    if (newUniqueItems.length > 0) {
      const updatedList = [...existingBlogs, ...newUniqueItems];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    }
  } catch (error) {
    console.error("Error writing to localStorage:", error);
  }
}

/**
 * Adds a single newly viewed/accessed blog object to the recent items in localStorage.
 * - If the item ID is already present, it is not duplicated.
 * - If not present and array length >= 4, the oldest item is removed and the new one is pushed/prepended.
 * 
 * @param newBlog Item object to be stored
 */
export function addRecentBlogToStorage(newBlog: any) {
  // 0. Ensure environment is browser-side
  if (typeof window === 'undefined') return;

  if (!newBlog || !newBlog.id) return;

  try {
    // 1. Fetch current stored blogs
    const storedRaw = localStorage.getItem(STORAGE_KEY);
    let existingBlogs: any[] = storedRaw ? JSON.parse(storedRaw) : [];

    // 2. Check if the blog is already present by ID
    const existingIndex = existingBlogs.findIndex((item) => item.id === newBlog.id);

    if (existingIndex !== -1) {
      // ID is already present -> Leave array untouched
      return;
    } else {
      // ID is NOT present -> Add new item at the top (beginning) of the list
      existingBlogs.unshift(newBlog);

      // If array exceeds 4 items, remove the oldest item (from the end)
      if (existingBlogs.length > MAX_RECENT_ITEMS) {
        existingBlogs = existingBlogs.slice(0, MAX_RECENT_ITEMS);
      }
    }

    // 3. Save updated list back to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingBlogs));
  } catch (error) {
    console.error("Error writing to localStorage:", error);
  }
}


// const MAX_RECENT_ITEMS = 4;
// const STORAGE_KEY = 'recent_blogs';


// /**
//  * Updates localStorage with incoming blog data until the array reaches 4 items.
//  * Ignores items that are already saved (by ID).
//  * 
//  * @param incomingData Array of blog objects fetched from the API
//  */
// export function syncRecentBlogsToStorage(incomingData: any[]) {
//   // 1. Guard against non-array response
//   if (!Array.isArray(incomingData) || incomingData.length === 0) {
//     return;
//   }

//   // 2. Read existing items from localStorage safely
//   const storedRaw = localStorage.getItem(STORAGE_KEY);
//   const existingBlogs: any[] = storedRaw ? JSON.parse(storedRaw) : [];

//   // 3. Stop immediately if we already reached the 4-item limit
//   if (existingBlogs.length >= MAX_RECENT_ITEMS) {
//     return;
//   }

//   // 4. Calculate how many new items are required
//   const slotsNeeded = MAX_RECENT_ITEMS - existingBlogs.length;

//   // 5. Filter out duplicate items already in storage
//   const newUniqueItems = incomingData
//     .filter((incomingItem) => !existingBlogs.some((stored) => stored.id === incomingItem.id))
//     .slice(0, slotsNeeded);

//   // 6. Merge and update localStorage if we have new items to add
//   if (newUniqueItems.length > 0) {
//     const updatedList = [...existingBlogs, ...newUniqueItems];
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
//   }
// }

// /**
//  * Adds a single newly viewed/accessed blog object to the recent items in localStorage.
//  * - If the item ID is already present, it is not duplicated (optionally moves to top).
//  * - If not present and array length >= 4, the oldest item is removed and the new one is pushed/prepended.
//  * 
//  * @param newBlog Item object to be stored
//  */
// export function addRecentBlogToStorage(newBlog: any) {
//   if (!newBlog || !newBlog.id) return;

//   // 1. Fetch current stored blogs
//   const storedRaw = localStorage.getItem(STORAGE_KEY);
//   let existingBlogs: any[] = storedRaw ? JSON.parse(storedRaw) : [];

//   // 2. Check if the blog is already present by ID
//   const existingIndex = existingBlogs.findIndex((item) => item.id === newBlog.id);

//   if (existingIndex !== -1) {
//     // ID is already present -> Option A: Leave array completely untouched
//     return;

//     /* 
//     // Option B: If you prefer moving existing item to the top of the list, uncomment below:
//     // existingBlogs.splice(existingIndex, 1);
//     // existingBlogs.unshift(newBlog);
//     */
//   } else {
//     // ID is NOT present -> Add new item at the top (beginning) of the list
//     existingBlogs.unshift(newBlog);

//     // If array exceeds 4 items, remove the oldest item (from the end)
//     if (existingBlogs.length > MAX_RECENT_ITEMS) {
//       existingBlogs = existingBlogs.slice(0, MAX_RECENT_ITEMS);
//     }
//   }

//   // 3. Save updated list back to localStorage
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(existingBlogs));
// }