function processQueries(input) {
    const [nm, ...queryLineList] = input.trim().split('\n');
    const [n, m] = nm.split(' ').map(Number);

    if(m !== queryLineList.length) {
        console.log('input error')
        return;
    }
    const queries = queryLineList.map(line => line.split(' ').map(Number));

    const adjList = Array.from({ length: n }, () => []);
    const resultsList = [];

    for (const query of queries) {
        const [type, a, b] = query;
        if (type === 1) {
            adjList[a - 1].push(b - 1);
            adjList[b - 1].push(a - 1);
        } else if (type === 2) {
            adjList[a - 1] = adjList[a - 1].filter(v => v !== b - 1);
            adjList[b - 1] = adjList[b - 1].filter(v => v !== a - 1);
        } else if (type === 3) {
            const visited = new Array(n).fill(false);
            let result = 0;
            const stack = [a];
            visited[a - 1] = true;
            while (stack.length) {
                const node = stack.pop();
                if (node === b) {
                    result = 1;
                    break;
                }
                for (const neighbor of adjList[node - 1]) {
                    if (!visited[neighbor]) {
                        stack.push(neighbor + 1);
                        visited[neighbor] = true;
                    }
                }
            }
            resultsList.push(result);
        }
    }

    console.log(resultsList.join('\n'));
    return resultsList;
}

const input = `4 11
1 1 2
1 2 3
1 3 4
1 1 4
3 4 2
2 1 2
3 2 4
2 3 4
3 4 2
1 2 4
3 4 2`;
const resultList = processQueries(input);
